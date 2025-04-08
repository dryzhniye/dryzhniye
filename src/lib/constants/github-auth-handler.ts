export const handleGithubAuth = () => {
  // const redirectUrl = 'https://dryzhniye.ru/auth/callback'
  const redirectUrl = 'http://localhost:3000/auth/callback'
  window.location.href = `https://inctagram.work/api/v1/auth/github/login?redirect_url=${encodeURIComponent(redirectUrl)}`
}
