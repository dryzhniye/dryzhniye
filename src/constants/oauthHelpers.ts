// oauthHelpers.ts
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || '';
const REDIRECT_URI = typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : '';

export const initiateGoogleAuth = () => {
  const baseUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const options = {
    redirect_uri: REDIRECT_URI,
    client_id: GOOGLE_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
  };

  const qs = new URLSearchParams(options);
  window.location.href = `${baseUrl}?${qs.toString()}`;
};

export const initiateGithubAuth = (redirectUrl: string) => {
  const baseUrl = 'https://github.com/login/oauth/authorize';
  const options = {
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: redirectUrl,
    scope: 'user:email',
  };

  const qs = new URLSearchParams(options);
  window.location.href = `${baseUrl}?${qs.toString()}`;
};