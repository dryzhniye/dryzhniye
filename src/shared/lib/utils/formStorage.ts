
export const saveFormValues = (values: string) => {
  localStorage.setItem('settingsForm', JSON.stringify(values))
}

export const getFormValues = () => {
  const stored = localStorage.getItem('settingsForm')
  return stored ? JSON.parse(stored) : undefined
}
