import { useNavigate } from 'react-router-dom'

export default function SocialAuthPage() {
  const navigate = useNavigate()

  const handleGoogleAuth = () => {
    // Simula autenticação Google
    setTimeout(() => navigate('/subscription'), 500)
  }

  const handleAppleAuth = () => {
    // Simula autenticação Apple
    setTimeout(() => navigate('/subscription'), 500)
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Vinculação de Conta</h1>
        <p style={styles.subtitle}>Conecte sua conta para salvar seu progresso</p>

        <div style={styles.authButtons}>
          <button onClick={handleGoogleAuth} style={styles.googleButton}>
            <span style={styles.buttonIcon}>🔵</span>
            Continuar com Google
          </button>
          <button onClick={handleAppleAuth} style={styles.appleButton}>
            <span style={styles.buttonIcon}>🍎</span>
            Continuar com Apple
          </button>
        </div>

        <div style={styles.benefits}>
          <h3 style={styles.benefitsTitle}>Benefícios:</h3>
          <div style={styles.benefit}>
            <span style={styles.benefitIcon}>✓</span>
            <p>Sincronize seu progresso em todos os dispositivos</p>
          </div>
          <div style={styles.benefit}>
            <span style={styles.benefitIcon}>✓</span>
            <p>Acesso aos seus favoritos e histórico</p>
          </div>
          <div style={styles.benefit}>
            <span style={styles.benefitIcon}>✓</span>
            <p>Recomendações personalizadas</p>
          </div>
        </div>

        <button onClick={() => navigate('/subscription')} style={styles.skipButton}>
          Pular por enquanto
        </button>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#FAFAF8',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  content: {
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
  },
  title: {
    fontSize: '40px',
    color: '#8B7355',
    marginBottom: '16px',
  },
  subtitle: {
    fontSize: '18px',
    color: '#666',
    marginBottom: '48px',
  },
  authButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '48px',
  },
  googleButton: {
    padding: '18px',
    backgroundColor: '#fff',
    border: '2px solid #E0E0E0',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
  },
  appleButton: {
    padding: '18px',
    backgroundColor: '#000',
    border: 'none',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
  },
  buttonIcon: {
    fontSize: '24px',
  },
  benefits: {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '12px',
    marginBottom: '24px',
    textAlign: 'left',
  },
  benefitsTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '16px',
    color: '#2D2D2D',
  },
  benefit: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px',
  },
  benefitIcon: {
    fontSize: '20px',
    color: '#8B7355',
    marginRight: '12px',
  },
  skipButton: {
    width: '100%',
    padding: '16px',
    backgroundColor: 'transparent',
    color: '#666',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
}
