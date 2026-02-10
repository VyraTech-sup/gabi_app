import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function SubscriptionPage() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly')

  const handleSubscribe = () => {
    navigate('/access-granted')
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.badge}>✨ 7 DIAS GRATUITOS ✨</div>
        
        <h1 style={styles.title}>Desbloqueie Todo o Conteúdo</h1>
        <p style={styles.subtitle}>Acesso ilimitado a todos os programas e recursos</p>

        <div style={styles.plans}>
          <div
            style={{
              ...styles.planCard,
              ...(selectedPlan === 'monthly' ? styles.planCardSelected : {}),
            }}
            onClick={() => setSelectedPlan('monthly')}
          >
            <h3 style={styles.planTitle}>Mensal</h3>
            <p style={styles.planPrice}>R$ 29,90/mês</p>
            <p style={styles.planDescription}>Cancele quando quiser</p>
          </div>
          <div
            style={{
              ...styles.planCard,
              ...(selectedPlan === 'yearly' ? styles.planCardSelected : {}),
            }}
            onClick={() => setSelectedPlan('yearly')}
          >
            <div style={styles.popularBadge}>MAIS POPULAR</div>
            <h3 style={styles.planTitle}>Anual</h3>
            <p style={styles.planPrice}>R$ 239,90/ano</p>
            <p style={styles.planDescription}>Economize 33%</p>
          </div>
        </div>

        <div style={styles.benefits}>
          <div style={styles.benefit}>✓ Acesso ilimitado a todos os programas</div>
          <div style={styles.benefit}>✓ Novos conteúdos semanais</div>
          <div style={styles.benefit}>✓ Downloads para ouvir offline</div>
          <div style={styles.benefit}>✓ Sem anúncios</div>
        </div>

        <button onClick={handleSubscribe} style={styles.subscribeButton}>
          Começar 7 Dias Grátis
        </button>

        <p style={styles.disclaimer}>
          Após o período de teste, será cobrado automaticamente. 
          Cancele a qualquer momento.
        </p>

        <div style={styles.links}>
          <a href="/terms" style={styles.link}>Termos de Uso</a>
          <span style={styles.linkSeparator}>•</span>
          <a href="/privacy" style={styles.link}>Privacidade</a>
        </div>
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
    maxWidth: '600px',
    width: '100%',
    textAlign: 'center',
  },
  badge: {
    display: 'inline-block',
    backgroundColor: '#FFD700',
    color: '#2D2D2D',
    padding: '8px 24px',
    borderRadius: '24px',
    fontWeight: 'bold',
    fontSize: '14px',
    marginBottom: '24px',
  },
  title: {
    fontSize: '48px',
    color: '#8B7355',
    marginBottom: '16px',
  },
  subtitle: {
    fontSize: '20px',
    color: '#666',
    marginBottom: '48px',
  },
  plans: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '32px',
  },
  planCard: {
    backgroundColor: '#fff',
    padding: '32px 24px',
    borderRadius: '16px',
    border: '3px solid #E0E0E0',
    cursor: 'pointer',
    position: 'relative',
    transition: 'all 0.2s',
  },
  planCardSelected: {
    borderColor: '#8B7355',
    transform: 'scale(1.05)',
  },
  popularBadge: {
    position: 'absolute',
    top: '-12px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#8B7355',
    color: '#fff',
    padding: '4px 16px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  planTitle: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '12px',
    color: '#2D2D2D',
  },
  planPrice: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#8B7355',
    marginBottom: '8px',
  },
  planDescription: {
    fontSize: '14px',
    color: '#666',
  },
  benefits: {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '12px',
    marginBottom: '32px',
    textAlign: 'left',
  },
  benefit: {
    padding: '12px 0',
    fontSize: '16px',
    color: '#2D2D2D',
  },
  subscribeButton: {
    width: '100%',
    padding: '20px',
    backgroundColor: '#8B7355',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginBottom: '16px',
  },
  disclaimer: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '24px',
  },
  links: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    fontSize: '14px',
  },
  link: {
    color: '#8B7355',
    textDecoration: 'none',
  },
  linkSeparator: {
    color: '#999',
  },
}
