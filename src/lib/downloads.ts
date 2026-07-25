import { supabase } from './supabase';
import type { Template } from '../types';

const UNAVAILABLE = 'Download is not available for this template.';

/**
 * Resolves the download URL for a template zip.
 *
 * - Free templates resolve to their public path immediately.
 * - Paid templates go through the `verify-download` edge function, which
 *   confirms the caller owns the template and returns a short-lived signed URL
 *   from the private `templates` bucket. If the caller does not own it (or is
 *   not signed in), the function responds non-2xx and this throws - callers
 *   should catch and route the user to buy.
 *
 * Prefer `downloadTemplateZip` below; this is exported for callers that need the
 * URL itself rather than a browser download.
 */
export async function getTemplateDownloadUrl(
  templateId: string,
  isFree: boolean,
): Promise<string> {
  if (isFree) {
    return `/templates/${templateId}.zip`;
  }

  const { data, error } = await supabase.functions.invoke<{ url?: unknown }>('verify-download', {
    body: { templateId },
  });

  if (error) {
    throw new Error(error.message ?? UNAVAILABLE);
  }

  // `data` is whatever the function sent - narrow it, don't assert it, or a
  // non-string escapes a signature that promises a string.
  const url = data?.url;
  if (typeof url !== 'string' || url.length === 0) {
    throw new Error(UNAVAILABLE);
  }

  return url;
}

/**
 * Resolves the URL and triggers the browser download. Taking the template object
 * (rather than an id + isFree pair) is what keeps the two from disagreeing -
 * asking for a paid template's public path only ever yields a dead link.
 */
export async function downloadTemplateZip(
  template: Pick<Template, 'id' | 'title' | 'isFree'>,
): Promise<void> {
  const url = await getTemplateDownloadUrl(template.id, template.isFree);
  const fileName = `${template.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.zip`;

  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
