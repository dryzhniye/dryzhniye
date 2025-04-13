import s from './LinearProgress.module.scss'

interface LinearProgressProps {
  color?: string
}

const LinearProgress: React.FC<LinearProgressProps> = ({ color = '#4caf50' }) => {
  return (
    <div className={s.linearProgress}>
      <div className={s.linearProgressBar} style={{ backgroundColor: color }} />
    </div>
  )
}

export default LinearProgress
