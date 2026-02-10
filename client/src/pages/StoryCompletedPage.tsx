import { useNavigate } from 'react-router-dom'

export default function StoryCompletedPage() {
  const navigate = useNavigate()

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.icon}>🎉</div>
        <h1 style={styles.title}>Parabéns!</h1>
        <h2 style={styles.subtitle}>Você completou sua sessão</h2>
        
        <div style={styles.message}>
          <p style={styles.messageText}>
            Você deu um importante passo na sua jornada de transformação pessoal. 
            Continue praticando regularmente para obter melhores resultados.
          </p>
        </div>

        <div style={styles.buttons}>
          <button onClick={() => navigate('/social-auth')} style={styles.primaryButton}>
            Continuar
          </button>
          <button onClick={() => navigate('/programs')} style={styles.secondaryButton}>
            Ouvir Outro Áudio
          </button>
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #8B7355 0%, #C9A885 100%)',
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
  icon: {
    fontSize: '120px',
    marginBottom: '32px',
  },
  title: {
    fontSize: '56px',
    fontWeight: 'bold',
    marginBottom: '16px',
  },
  subtitle: {
    fontSize: '28px',
    marginBottom: '48px',
    opacity: 0.9,
  },
  message: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: '32px',
    borderRadius: '16px',
    marginBottom: '48px',
  },
  messageText: {
    fontSize: '18px',
    lineHeight: '1.6',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  primaryButton: {
    padding: '20px',
    backgroundColor: '#fff',
    color: '#8B7355',
    border: 'none',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  secondaryButton: {
    padding: '20px',
    backgroundColor: 'transparent',
    color: '#fff',
    border: '2px solid #fff',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
}
