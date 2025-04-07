import ReCAPTCHA from 'react-google-recaptcha'
import { ComponentProps } from 'react'

type RecaptchaProps = ComponentProps<typeof ReCAPTCHA>

export const Recaptcha = (props: RecaptchaProps) => {
  return <ReCAPTCHA {...props} />
}