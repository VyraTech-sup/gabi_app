import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function AudioPlayerPage() {
  const navigate = useNavigate()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration] = useState(900) // 15 minutos em segundos

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false)
            navigate('/story-completed')
            return duration
          }
          return prev + 1
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isPlaying, duration, navigate])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const progress = (currentTime / duration) * 100

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.coverImage}>
          <img 
            src="https://picsum.photos/seed/med1/400/400" 
            alt="Capa"
            style={styles.coverImageImg}
          />
        </div>

        <h2 style={styles.title}>Fé e Autocura</h2>
        <p style={styles.instructor}>Dr. Paulo Mendes</p>

        <div style={styles.progressContainer}>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${progress}%` }} />
          </div>
          <div style={styles.timeContainer}>
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div style={styles.controls}>
          <button style={styles.controlButton}>⏮️</button>
          <button 
            style={styles.playButton}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <button style={styles.controlButton}>⏭️</button>
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#2D2D2D',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  content: {
    maxWidth: '600px',
    width: '100%',
    textAlign: 'center',
    color: '#fff',
  },
  coverImage: {
    marginBottom: '48px',
  },
  coverImageImg: {
    width: '300px',
    height: '300px',
    borderRadius: '24px',
    objectFit: 'cover',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  instructor: {
    fontSize: '18px',
    color: '#999',
    marginBottom: '48px',
  },
  progressContainer: {
    marginBottom: '48px',
  },
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: '#444',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '12px',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8B7355',
    transition: 'width 0.3s',
  },
  timeContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    color: '#999',
  },
  controls: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '24px',
  },
  controlButton: {
    fontSize: '32px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#fff',
  },
  playButton: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#8B7355',
    border: 'none',
    cursor: 'pointer',
    fontSize: '32px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}
