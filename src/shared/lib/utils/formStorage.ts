
export const saveFormValues = (values: string) => {
  sessionStorage.setItem('settingsForm', JSON.stringify(values))
}

export const getFormValues = () => {
  const stored = sessionStorage.getItem('settingsForm')
  return stored ? JSON.parse(stored) : undefined
}
