import { Header } from '@/shared/ui/Header/Header'
import styles from './signUp.module.scss'
import Input from '@/shared/ui/Input/Input'

export default function LoginPage() {
  return (
    <div>
      <Header isLoggedIn={false} />
      <form className={styles.block}>
        <h1 style={{ color: 'var(--light-100)', fontSize: '20px' }}>Sign Up</h1>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <a href="#">
            <img src="/google.svg" alt="" />
          </a>
          <a href="#">
            <img src="/github.svg" alt="" />
          </a>
        </div>
        <Input label={'Username'} placeholder={'Username'} />
        <Input label={'Email'} placeholder={'email'} />
        <Input label={'Password'} placeholder={'Password'} />
      </form>
    </div>
  )
}
