import { jwtDecode } from 'jwt-decode'

export const getDecodedToken = (accessToken: string | undefined) => {
  if (accessToken) {
    const decodedToken = jwtDecode<{ userId: string }>(accessToken)
    return decodedToken.userId
  }
  return null
}
