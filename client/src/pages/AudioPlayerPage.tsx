import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

// Lista oficial (fonte da verdade) - ordem fixa
const AUDIO_LIST = [
  {
    id: 'fe-autocura',
    title: 'Ative Fé e Autocura',
    instructor: 'Gabriela Artz',
    file: 'ativefeeautocura.mp3',
  },
  {
    id: 'insonia',
    title: 'Elimine a Insônia',
    instructor: 'Gabriela Artz',
    file: 'elimineainsonia.mp3',
  },
  {
    id: 'mudancas',
    title: 'Se Abra Para Mudanças',
    instructor: 'Gabriela Artz',
    file: 'seabraparamudanças.mp4',
  },
  {
    id: 'felicidade',
    title: 'Ative a Felicidade',
    instructor: 'Gabriela Artz',
    file: 'ativeafelicidade.mp3',
  },
  {
    id: 'autoconfianca',
    title: 'Fortaleça a Autoconfiança',
    instructor: 'Gabriela Artz',
    file: 'fortaleçaaautoconfiança.mp3',
  },
]

export default function AudioPlayerPage() {
  const navigate = useNavigate()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(900) // 15 minutos em segundos (fallback)
  const [audioBlocked, setAudioBlocked] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const audioId = searchParams.get('audioId')
  const currentAudio = audioId ? AUDIO_LIST.find(a => a.id === audioId) : null

  useEffect(() => {
    // Prefer syncing with actual audio element when available
    const audio = audioRef.current
    if (audio) {
      const onTime = () => setCurrentTime(Math.floor(audio.currentTime))
      const onEnded = () => {
        setIsPlaying(false)
        navigate('/story-completed')
      }
      const onDuration = () => {
        if (!isNaN(audio.duration) && audio.duration > 0) setDuration(Math.floor(audio.duration))
      }
      audio.addEventListener('timeupdate', onTime)
      audio.addEventListener('ended', onEnded)
      audio.addEventListener('durationchange', onDuration)
      audio.addEventListener('error', () => {
        console.warn('Audio error', audio.error)
      })
      return () => {
        audio.removeEventListener('timeupdate', onTime)
        audio.removeEventListener('ended', onEnded)
        audio.removeEventListener('durationchange', onDuration)
      }
    }

    // fallback simulated timer (keeps existing behavior if no audio element)
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

        <h2 style={styles.title}>{currentAudio?.title || 'Fé e Autocura'}</h2>
        <p style={styles.instructor}>{currentAudio?.instructor || 'Gabriela Artz'}</p>

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
            onClick={async () => {
              // If an audio URL was provided (e.g., via query param or later by front), use real audio
              if (currentAudio) {
                // lazy init audio element on first interaction
                if (!audioRef.current) {
                  const src = `/assets/${currentAudio.file}`
                  const a = new Audio(src)
                  a.preload = 'metadata'
                  a.crossOrigin = 'anonymous'
                  audioRef.current = a
                }

                const audio = audioRef.current!

                // unlock audio on iOS/Safari
                try {
                  await unlockAudioIfNeeded()
                } catch (e) {
                  console.warn('unlockAudioIfNeeded failed', e)
                }

                if (!isPlaying) {
                  try {
                    const playResult = audio.play()
                    if (playResult !== undefined) await playResult
                    setIsPlaying(true)
                    setAudioBlocked(false)
                  } catch (err) {
                    console.warn('play() rejected', err)
                    setAudioBlocked(true)
                    setIsPlaying(false)
                  }
                } else {
                  audio.pause()
                  setIsPlaying(false)
                }
              } else {
                // no audio selected yet — keep existing simulated behavior
                setIsPlaying(!isPlaying)
              }
            }}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <button style={styles.controlButton}>⏭️</button>
        </div>

        {audioBlocked && (
          <div style={styles.overlay} onClick={async () => {
            try {
              await unlockAudioIfNeeded()
              if (audioRef.current) await audioRef.current.play()
              setAudioBlocked(false)
              setIsPlaying(true)
            } catch (e) {
              console.warn('overlay play failed', e)
            }
          }}>
            Toque para ativar áudio
          </div>
        )}
      </div>
    </div>
  )
}

async function unlockAudioIfNeeded() {
  if (typeof window === 'undefined') return
  // try WebAudio resume
  const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext
  if (AudioCtx) {
    try {
      const ctx = new AudioCtx()
      if (ctx.state === 'suspended') await ctx.resume()
      // play a tiny silent buffer to ensure audio is unlocked
      const buffer = ctx.createBuffer(1, 1, 22050)
      const src = ctx.createBufferSource()
      src.buffer = buffer
      src.connect(ctx.destination)
      src.start(0)
      src.stop(0)
      ;(window as any).__AUDIO_CTX = ctx
      return
    } catch (e) {
      console.warn('WebAudio unlock failed', e)
    }
  }

  // fallback: create muted Audio and play/pause it
  try {
    const a = new Audio()
    a.muted = true
    const p = a.play()
    if (p && p.catch) p.catch(() => {})
    a.pause()
  } catch (e) {
    console.warn('HTMLAudio unlock fallback failed', e)
  }
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
