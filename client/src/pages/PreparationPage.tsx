import { useNavigate } from 'react-router-dom'

export default function PreparationPage() {
  const navigate = useNavigate()

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.icon}>🎧</div>
        <h1 style={styles.title}>Para uma melhor experiência</h1>
        <h2 style={styles.subtitle}>Use fones de ouvido</h2>
        
        <div style={styles.tips}>
          <div style={styles.tip}>
            <span style={styles.tipIcon}>✓</span>
            <p style={styles.tipText}>Encontre um lugar tranquilo e confortável</p>
          </div>
          <div style={styles.tip}>
            <span style={styles.tipIcon}>✓</span>
            <p style={styles.tipText}>Ajuste o volume para um nível confortável</p>
          </div>
          <div style={styles.tip}>
            <span style={styles.tipIcon}>✓</span>
            <p style={styles.tipText}>Permita-se relaxar completamente</p>
          </div>
        </div>

        <button onClick={() => navigate('/audio-player')} style={styles.startButton}>
          Estou Pronto, Iniciar
        </button>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#8B7355',
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
    fontSize: '96px',
    marginBottom: '32px',
  },
  title: {
    fontSize: '36px',
    fontWeight: '600',
    marginBottom: '16px',
  },
  subtitle: {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '48px',
  },
  tips: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    marginBottom: '48px',
  },
  tip: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: '20px',
    borderRadius: '12px',
  },
  tipIcon: {
    fontSize: '32px',
    marginRight: '16px',
  },
  tipText: {
    fontSize: '18px',
    textAlign: 'left',
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
