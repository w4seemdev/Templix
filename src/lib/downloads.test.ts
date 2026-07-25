/**
 * The delivery half of the money path.
 *
 * 52 of the 61 templates are paid and live in a private bucket. This file covers
 * the CLIENT half of the gate: that `getTemplateDownloadUrl` never short-circuits
 * to a `/templates/<id>.zip` path for a paid template — that public directory is
 * exactly where the 52 paid zips used to sit — and that it asks `verify-download`
 * instead. Every test below is written so that a regression which re-opens that
 * hole, or which turns a 403 into a silently broken download, fails loudly here.
 *
 * What it does NOT cover: whether the server says no. Ownership is enforced in
 * `supabase/functions/verify-download/index.ts`, and mocking `./supabase` stubs
 * the boundary at precisely that point — these tests prove the client asks, not
 * that the answer is correct. That function has no automated test (vitest only
 * collects `src/**`); the smoke test in docs/DEPLOYMENT.md section 10 is the
 * only check on it.
 *
 * The Supabase client is the boundary and the only thing mocked; the module
 * under test is imported for real.
 */
import { downloadTemplateZip, getTemplateDownloadUrl } from './downloads';

const { invoke } = vi.hoisted(() => ({ invoke: vi.fn() }));

vi.mock('./supabase', () => ({ supabase: { functions: { invoke } } }));

/** What verify-download hands back: a short-lived signed URL, not a site path. */
const SIGNED_URL =
  'https://project.supabase.co/storage/v1/object/sign/templates/1.zip?token=short-lived';

let clicks: HTMLAnchorElement[] = [];

beforeEach(() => {
  invoke.mockReset();
  clicks = [];
  // jsdom would log "Not implemented: navigation" and swallow the anchor; this
  // records the element the code actually clicked instead.
  vi.spyOn(HTMLElement.prototype, 'click').mockImplementation(function (this: HTMLElement) {
    clicks.push(this as HTMLAnchorElement);
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('getTemplateDownloadUrl', () => {
  it('resolves a free template to its public zip without calling the edge function', async () => {
    const url = await getTemplateDownloadUrl('2', true);

    expect(url).toBe('/templates/2.zip');
    expect(invoke).not.toHaveBeenCalled();
  });

  it('asks verify-download for a signed URL when the template is paid', async () => {
    invoke.mockResolvedValue({ data: { url: SIGNED_URL }, error: null });

    const url = await getTemplateDownloadUrl('1', false);

    expect(invoke).toHaveBeenCalledWith('verify-download', { body: { templateId: '1' } });
    expect(url).toBe(SIGNED_URL);
    expect(url.startsWith('/templates/')).toBe(false);
  });

  it('rejects instead of falling back to a public path when the buyer does not own the template', async () => {
    invoke.mockResolvedValue({
      data: null,
      error: new Error('Edge Function returned a non-2xx status code'),
    });

    await expect(getTemplateDownloadUrl('1', false)).rejects.toThrow(
      'Edge Function returned a non-2xx status code',
    );
  });

  it('reports an unavailable download when the function refuses without a message', async () => {
    invoke.mockResolvedValue({ data: null, error: { message: undefined } });

    await expect(getTemplateDownloadUrl('1', false)).rejects.toThrow(
      'Download is not available for this template.',
    );
  });

  it('rejects when the function answers 200 but omits the url', async () => {
    invoke.mockResolvedValue({ data: {}, error: null });

    await expect(getTemplateDownloadUrl('1', false)).rejects.toThrow(
      'Download is not available for this template.',
    );
  });

  it('rejects when the url is not a string', async () => {
    invoke.mockResolvedValue({ data: { url: 42 }, error: null });

    await expect(getTemplateDownloadUrl('1', false)).rejects.toThrow(
      'Download is not available for this template.',
    );
  });

  it('rejects when the url is an empty string', async () => {
    invoke.mockResolvedValue({ data: { url: '' }, error: null });

    await expect(getTemplateDownloadUrl('1', false)).rejects.toThrow(
      'Download is not available for this template.',
    );
  });

  it('propagates a network failure rather than resolving to anything downloadable', async () => {
    invoke.mockRejectedValue(new TypeError('Failed to fetch'));

    await expect(getTemplateDownloadUrl('1', false)).rejects.toThrow('Failed to fetch');
  });
});

describe('downloadTemplateZip', () => {
  it('downloads a free template from its public path under a slugified file name', async () => {
    await downloadTemplateZip({ id: '2', title: 'Folio — Portfolio', isFree: true });

    expect(clicks).toHaveLength(1);
    expect(clicks[0].getAttribute('href')).toBe('/templates/2.zip');
    expect(clicks[0].download).toBe('folio---portfolio.zip');
  });

  it('downloads a paid template from the signed URL, never from /templates/', async () => {
    invoke.mockResolvedValue({ data: { url: SIGNED_URL }, error: null });

    await downloadTemplateZip({ id: '1', title: 'Luminary — SaaS', isFree: false });

    expect(clicks).toHaveLength(1);
    expect(clicks[0].getAttribute('href')).toBe(SIGNED_URL);
    expect(clicks[0].download).toBe('luminary---saas.zip');
  });

  it('leaves no anchor behind in the document once the download is triggered', async () => {
    await downloadTemplateZip({ id: '2', title: 'Folio — Portfolio', isFree: true });

    expect(document.querySelector('a[download]')).toBeNull();
  });

  it('throws and starts no download when the template is not owned', async () => {
    invoke.mockResolvedValue({ data: null, error: new Error('Unauthorized') });

    await expect(
      downloadTemplateZip({ id: '1', title: 'Luminary — SaaS', isFree: false }),
    ).rejects.toThrow('Unauthorized');
    expect(clicks).toHaveLength(0);
    expect(document.querySelector('a[download]')).toBeNull();
  });
});
