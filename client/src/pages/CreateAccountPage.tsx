import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { trpc, isApiAvailable, API_BASE_URL } from '../lib/trpc'

export default function CreateAccountPage() {
  const navigate = useNavigate()
  
  // Estados do formulário
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Validação e envio
  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Defensive: block API calls if VITE_API_URL is not configured correctly
    if (!isApiAvailable) {
      console.error('[CreateAccount] API unavailable. VITE_API_URL=', API_BASE_URL)
      setError('Serviço indisponível no momento. Contate o suporte.')
      return
    }

    // Validar campos
    if (!name.trim()) {
      setError('Por favor, preencha seu nome')
      return
    }

    if (!email.trim()) {
      setError('Por favor, preencha seu email')
      return
    }

    if (!phone.trim()) {
      setError('Por favor, preencha seu telefone/WhatsApp')
      return
    }

    if (!password.trim()) {
      setError('Por favor, preencha sua senha')
      return
    }

    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres')
      return
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Por favor, insira um email válido')
      return
    }

    // Criar conta no banco de dados E enviar para planilha
    setLoading(true)
    try {
      // 1. Criar conta no banco de dados
      const result = await trpc.auth.register.mutate({
        email: email.trim().toLowerCase(),
        password: password,
        name: name.trim(),
        phone: phone.trim(),
      })

      if (result.success) {
        // 2. Enviar para planilha do Zapier (não bloqueia se falhar)
        try {
          const formData = new URLSearchParams({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            created_at: new Date().toISOString(),
            source: 'all_mind_web',
          })

          await fetch('https://hooks.zapier.com/hooks/catch/24026668/ue90sb1/', {
            method: 'POST',
            body: formData,
          })
        } catch (zapierError) {
          // Se falhar o Zapier, não importa - conta já foi criada
          console.warn('Falha ao enviar para planilha:', zapierError)
        }

        // Conta criada e usuário logado automaticamente
        navigate('/success-account')
      } else {
        setError('Erro ao criar conta. Tente novamente.')
      }
    } catch (err: any) {
      console.error('Erro ao criar conta:', err)
      // Handle common causes: backend unreachable / non-JSON response
      const msg = String(err?.message || '')
      if (msg.includes('already registered')) {
        setError('Este email já está cadastrado. Faça login.')
      } else if (msg.includes('Unexpected end of JSON input') || msg.includes('Failed to fetch') || msg.includes('NetworkError')) {
        setError('Erro de comunicação com o servidor. Tente novamente mais tarde.')
      } else {
        setError(err.message || 'Erro ao criar conta. Tente novamente.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>Criar Conta</h1>
          <p style={styles.subtitle}>Preencha seus dados para começar</p>
        </div>

        <form onSubmit={handleCreateAccount} style={styles.form}>
          {/* Input Nome */}
          <input
            type="text"
            placeholder="Nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            style={styles.input}
          />

          {/* Input Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            style={styles.input}
          />

          {/* Input Telefone/WhatsApp */}
          <input
            type="tel"
            placeholder="Telefone/WhatsApp"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={loading}
            style={styles.input}
          />

          {/* Input Senha */}
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            style={styles.input}
          />

          {/* Mensagem de erro */}
          {error && <p style={styles.error}>{error}</p>}

          {/* Botão Criar Conta */}
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {}),
            }}
          >
            {loading ? 'Criando...' : 'Criar conta'}
          </button>

          {/* Botão Voltar */}
          <button
            type="button"
            onClick={() => navigate('/onboarding')}
            disabled={loading}
            style={{
              ...styles.buttonOutline,
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
  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
}
