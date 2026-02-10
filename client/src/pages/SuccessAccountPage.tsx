import { useNavigate } from 'react-router-dom'

export default function SuccessAccountPage() {
  const navigate = useNavigate()

  const handleEnterApp = () => {
    // Navegar para a Home
    navigate('/home')
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Ícone de Sucesso */}
        <div style={styles.iconContainer}>
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#4CAF50" strokeWidth="2" fill="none" />
            <path d="M8 12l2 2 4-4" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Texto de Confirmação */}
        <h1 style={styles.title}>Conta criada com sucesso!</h1>
        <p style={styles.subtitle}>
          Bem-vindo ao All Mind. Sua jornada de transformação começa agora.
        </p>

        {/* Botão para Entrar */}
        <button onClick={handleEnterApp} style={styles.button}>
          Entrar no aplicativo
        </button>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3A5A6C',
    padding: '20px',
  },
  content: {
    maxWidth: '600px',
    width: '100%',
    textAlign: 'center',
    color: '#fff',
  },
  iconContainer: {
    marginBottom: '32px',
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '16px',
  },
  subtitle: {
    fontSize: '16px',
    marginBottom: '48px',
    opacity: 0.9,
    lineHeight: 1.6,
  },
  button: {
    padding: '16px 48px',
    fontSize: '18px',
    fontWeight: 'bold',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#fff',
    color: '#3A5A6C',
  },
}
