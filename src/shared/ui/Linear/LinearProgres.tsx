import s from './LinearProgres.module.scss'

interface LinearProgressProps {
  color?: string
}

const LinearProgres: React.FC<LinearProgressProps> = ({ color = '#4caf50' }) => {
  return (
    <div className={s.linearProgress}>
      <div className={s.linearProgressBar} style={{ backgroundColor: color }} />
    </div>
  )
}

export default LinearProgres
