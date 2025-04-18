export const handleGoogleAuth = () => {

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  const redirectUri = 'https://dryzhniye.ru/auth/callback/google'
  const scope = 'email profile'
  const responseType = 'code'

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=${responseType}&scope=${encodeURIComponent(scope)}`

  window.location.href = googleAuthUrl
}