import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { trpc, isApiAvailable, API_BASE_URL } from '../lib/trpc'

export default function LoginPage() {
  const navigate = useNavigate()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!isApiAvailable) {
      console.error('[Login] API unavailable. VITE_API_URL=', API_BASE_URL)
      setError('Serviço indisponível no momento. Contate o suporte.')
      return
    }

    if (!email.trim()) {
      setError('Por favor, preencha seu email')
      return
    }

    if (!password.trim()) {
      setError('Por favor, preencha sua senha')
      return
    }

    setLoading(true)
    try {
      const result = await trpc.auth.login.mutate({
        email: email.trim().toLowerCase(),
        password: password,
      })

      if (result.success) {
        // Login bem-sucedido, redireciona para home
        navigate('/')
      }
    } catch (err: any) {
      console.error('Erro ao fazer login:', err)
      const msg = String(err?.message || '')
      if (msg.includes('HTTP') || /\b[45]\d{2}\b/.test(msg) || msg.includes('Failed to fetch') || msg.includes('NetworkError')) {
        setError('Erro de comunicação com o servidor. Tente novamente mais tarde.')
      } else {
        setError('Email ou senha inválidos')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>Entrar</h1>
          <p style={styles.subtitle}>Acesse sua conta</p>
        </div>

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            style={styles.input}
          />

          {error && <p style={styles.error}>{error}</p>}

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {}),
            }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/create-account')}
            disabled={loading}
            style={{
              ...styles.buttonOutline,
              ...(loading ? styles.buttonDisabled : {}),
            }}
          >
            Criar conta
          </button>

          <button
            type="button"
            onClick={() => navigate('/onboarding')}
            disabled={loading}
            style={{
              ...styles.buttonText,
              ...(loading ? styles.buttonDisabled : {}),
            }}
          >
            Voltar
          </button>
        </form>
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
    maxWidth: '500px',
    width: '100%',
  },
  header: {
    marginBottom: '32px',
    textAlign: 'center',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  input: {
    padding: '16px',
    fontSize: '16px',
    borderRadius: '8px',
    border: 'none',
    outline: 'none',
    backgroundColor: '#fff',
    color: '#3A5A6C',
  },
  error: {
    color: '#ff6b6b',
    fontSize: '14px',
    textAlign: 'center',
    margin: '0',
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    padding: '12px',
    borderRadius: '8px',
  },
  button: {
    padding: '16px',
    fontSize: '18px',
    fontWeight: 'bold',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#fff',
    color: '#3A5A6C',
    marginTop: '8px',
  },
  buttonOutline: {
    padding: '16px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '8px',
    border: '2px solid #fff',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    color: '#fff',
  },
  buttonText: {
    padding: '8px',
    fontSize: '14px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
}
