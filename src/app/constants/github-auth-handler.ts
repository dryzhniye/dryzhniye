export const handleGithubAuth = () => {
  const redirectUrl = 'https://dryzhniye.ru/auth/callback'
  window.location.href = `https://dryzhniye.ru/api/v1/auth/github/login?redirect_url=${encodeURIComponent(redirectUrl)}`
}