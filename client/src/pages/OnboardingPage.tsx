import { useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'

export default function OnboardingPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Auto-play video on step 2
  useEffect(() => {
    if (step === 2 && videoRef.current) {
      videoRef.current.play()
    }
  }, [step])

  // Step 1: allmind-tela1.png
  if (step === 1) {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
        <img 
          src="/assets/onboarding/allmind-tela1.png" 
          alt="Onboarding 1"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        
        {/* Botão Criar Conta - Centralizado na parte inferior */}
        <div style={{ position: 'absolute', bottom: 100, left: 20, right: 20, display: 'flex', justifyContent: 'center', zIndex: 10 }}>
          <button
            onClick={() => navigate('/create-account')}
            style={{
              background: '#FFFFFF',
              border: 'none',
              borderRadius: '12px',
              padding: '16px 48px',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#3A5A6C',
              cursor: 'pointer',
              minWidth: '200px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
            }}
          >
            Criar conta
          </button>
        </div>

        <div style={{ position: 'absolute', bottom: 40, right: 20 }}>
          <button 
            onClick={() => setStep(2)}
            style={{
              background: 'rgba(255,255,255,0.9)',
              border: 'none',
              borderRadius: '25px',
              width: '50px',
              height: '50px',
              fontSize: '28px',
              cursor: 'pointer',
            }}
          >
            →
          </button>
        </div>
      </div>
    )
  }

  // Step 2: allmind-tela2.mp4 (VIDEO)
  if (step === 2) {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', backgroundColor: '#000' }}>
        <video 
          ref={videoRef}
          muted
          playsInline
          onEnded={() => setStep(3)}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source src="/assets/onboarding/allmind-tela2.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', bottom: 40, left: 20, right: 20, display: 'flex', justifyContent: 'space-between' }}>
          <button 
            onClick={() => setStep(1)}
            style={{
              background: 'rgba(255,255,255,0.9)',
              border: 'none',
              borderRadius: '25px',
              width: '50px',
              height: '50px',
              fontSize: '28px',
              cursor: 'pointer',
            }}
          >
            ←
          </button>
          <button 
            onClick={() => setStep(3)}
            style={{
              background: 'rgba(255,255,255,0.9)',
              border: 'none',
              borderRadius: '25px',
              width: '50px',
              height: '50px',
              fontSize: '28px',
              cursor: 'pointer',
            }}
          >
            →
          </button>
        </div>
      </div>
    )
  }

  // Step 3: allmind-tela3.png
  if (step === 3) {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
        <img 
          src="/assets/onboarding/allmind-tela3.png" 
          alt="Onboarding 3"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', bottom: 40, left: 20, right: 20, display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button 
            onClick={() => setStep(2)}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '32px',
              color: '#FFF',
              cursor: 'pointer',
            }}
          >
            ←
          </button>
          <button 
            onClick={() => setStep(4)}
            style={{
              flex: 1,
              background: '#FFFFFF',
              border: 'none',
              borderRadius: '12px',
              padding: '16px',
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#3A5A6C',
              cursor: 'pointer',
            }}
          >
            CONTINUAR →
          </button>
        </div>
      </div>
    )
  }

  // Step 4: allmind-tela4.png
  if (step === 4) {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
        <img 
          src="/assets/onboarding/allmind-tela4.png" 
          alt="Onboarding 4"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', bottom: 40, left: 20, right: 20, display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button 
            onClick={() => setStep(3)}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '32px',
              color: '#FFF',
              cursor: 'pointer',
            }}
          >
            ←
          </button>
          <button 
            onClick={() => navigate('/mental-recording-choice')}
            style={{
              flex: 1,
              background: '#FFFFFF',
              border: 'none',
              borderRadius: '12px',
              padding: '16px',
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#3A5A6C',
              cursor: 'pointer',
            }}
          >
            Iniciar Story 1
          </button>
        </div>
      </div>
    )
  }

  return null
}
