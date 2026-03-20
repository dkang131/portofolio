import { useEffect } from 'react'
import './Toast.css'

interface ToastProps {
  message: string
  onClose: () => void
  duration?: number
}

export default function Toast({ message, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [onClose, duration])

  return (
    <div className="toast-container">
      <div className="toast">
        <span className="toast-message">{message}</span>
        <button className="toast-close" onClick={onClose} aria-label="Close">
          ×
        </button>
      </div>
    </div>
  )
}
