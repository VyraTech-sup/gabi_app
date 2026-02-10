import { useNavigate } from 'react-router-dom'

export default function AccessGrantedPage() {
  const navigate = useNavigate()

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.icon}>🎉</div>
        <h1 style={styles.title}>Acesso Liberado!</h1>
        <p style={styles.subtitle}>Bem-vindo ao All Mind Premium</p>

        <div style={styles.message}>
          <p style={styles.messageText}>
            Você agora tem acesso completo a todos os nossos programas, 
            meditações guiadas, músicas relaxantes e muito mais.
          </p>
          <p style={styles.messageText}>
            Sua jornada de transformação começa agora!
          </p>
        </div>

        <button onClick={() => navigate('/home')} style={styles.startButton}>
          Explorar Conteúdo
        </button>
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
    fontSize: '24px',
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
    marginBottom: '16px',
  },
  startButton: {
    width: '100%',
    padding: '20px',
    backgroundColor: '#fff',
    color: '#8B7355',
    border: 'none',
    borderRadius: '12px',
    fontSize: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
}
