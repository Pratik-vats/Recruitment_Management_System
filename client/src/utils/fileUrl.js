/**
 * Utility to construct an authenticated URL for viewing/downloading resumes.
 * Appends the JWT token as a query parameter so that standard browser navigations,
 * <a target="_blank"> clicks, and <iframe> previews can authenticate with the backend.
 */
export const getResumeFileUrl = (filename) => {
  if (!filename) return '';
  const token = localStorage.getItem('token');
  let base = (import.meta.env.VITE_API_URL || '/api').trim().replace(/\/$/, '');
  if (base.startsWith('http') && !base.endsWith('/api')) {
    base += '/api';
  }
  const tokenParam = token ? `?token=${encodeURIComponent(token)}` : '';
  return `${base}/profile/resume-file/${encodeURIComponent(filename)}${tokenParam}`;
};
