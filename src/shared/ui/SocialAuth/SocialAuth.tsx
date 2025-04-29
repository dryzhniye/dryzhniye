import Image from 'next/image'
import Link from 'next/link'
import { PATH } from '@/shared/lib/const/PATH'
import { handleGoogleAuth } from '@/shared/lib/utils/google-auth-handler'
import s from './SocialAuth.module.scss'

export const SocialAuth = () => (
  <div className={s.autorizationIcon}>
    <button style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}} type="button" onClick={handleGoogleAuth}>
      <Image  src="/google.svg" alt="" width={34} height={34} />
    </button>
    <Link href={PATH.GITHUB}>
      <Image src="/github.svg" alt="" width={34} height={34} />
    </Link>
  </div>
)