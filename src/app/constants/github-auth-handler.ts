export const handleGithubAuth = () => {
  const redirectUrl = 'http://localhost:3000/auth/callback'
  // const redirectUrl = 'http://localhost:3000/auth/callback/github'

  // const loginUrl = `https://dryzhniye.ru/api/v1/auth/github/login?redirect_url=${encodeURIComponent(redirectUrl)}`
  const loginUrl = `https://inctagram.work/api/v1/auth/github/login?redirect_url=${encodeURIComponent(redirectUrl)}`
  // const loginUrl = `https://google.com`

  window.location.href = loginUrl
}