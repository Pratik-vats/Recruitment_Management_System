/**
 * Utility to construct an authenticated URL for viewing/downloading resumes.
 * Appends the JWT token as a query parameter so that standard browser navigations,
 * <a target="_blank"> clicks, and <iframe> previews can authenticate with the backend.
 */
export const getResumeFileUrl = (filename) => {
  if (!filename) return '';
  const token = localStorage.getItem('token');
  const base = import.meta.env.VITE_API_URL || '/api';
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const tokenParam = token ? `?token=${encodeURIComponent(token)}` : '';
  return `${cleanBase}/profile/resume-file/${encodeURIComponent(filename)}${tokenParam}`;
};
