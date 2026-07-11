import { supabase } from './supabase';

/**
 * Resolves the download URL for a template zip.
 *
 * - Free templates resolve to their public path immediately.
 * - Paid templates go through the `verify-download` edge function, which
 *   confirms the caller owns the template and returns a short-lived signed URL
 *   from the private `templates` bucket. If the caller does not own it (or is
 *   not signed in), the function responds non-2xx and this throws — callers
 *   should catch and route the user to buy.
 */
export async function getTemplateDownloadUrl(
  templateId: string,
  isFree: boolean,
): Promise<string> {
  if (isFree) {
    return `/templates/${templateId}.zip`;
  }

  const { data, error } = await supabase.functions.invoke('verify-download', {
    body: { templateId },
  });

  if (error) {
    throw new Error(error.message ?? 'Download is not available for this template.');
  }

  const url = (data as { url?: string } | null)?.url;
  if (!url) {
    throw new Error('Download is not available for this template.');
  }

  return url;
}
