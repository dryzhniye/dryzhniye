
import ReCAPTCHA from 'react-google-recaptcha';

const MyForm = () => {

  const handleRecaptchaChange = (value: string | null) => {
    console.log("Captcha value:", value);
  };


  return (
          <ReCAPTCHA
              theme="dark"
              sitekey="6Lckav8qAAAAAIr3zUA1Z8DTqPe8ZQgbjU3khpAI"
              onChange={handleRecaptchaChange}
          />

  );
};

export default MyForm;
