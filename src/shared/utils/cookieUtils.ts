export const setCookie = (name: string, value: string, days: number): void => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`
}

export const getCookie = (name: string): string => {
  return document.cookie.split('; ').reduce((acc, cookie) => {
    const [key, value] = cookie.split('=')
    return key === name ? decodeURIComponent(value) : acc
  }, '')
}

export const deleteCookie = (name: string): void => {
  setCookie(name, '', -1)
}
