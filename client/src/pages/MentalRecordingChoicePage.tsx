import { useNavigate } from 'react-router-dom'
import { mockPrograms } from '../data/mockData'

export default function MentalRecordingChoicePage() {
  const navigate = useNavigate()
  const featuredPrograms = mockPrograms.slice(0, 3)

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Inicie sua Reprogramação Mental</h1>
        <p style={styles.subtitle}>Escolha um dos programas abaixo para começar</p>

        <div style={styles.programsList}>
          {featuredPrograms.map((program) => (
            <div
              key={program.id}
              style={styles.programItem}
              onClick={() => navigate('/preparation', { state: { programId: program.id } })}
            >
              <img src={program.coverImage} alt={program.title} style={styles.programImage} />
              <div style={styles.programInfo}>
                <h3 style={styles.programTitle}>{program.title}</h3>
                <p style={styles.programInstructor}>{program.instructor}</p>
              </div>
              <button style={styles.selectButton}>Selecionar →</button>
            </div>
          ))}
        </div>

        <button onClick={() => navigate('/programs')} style={styles.viewAllButton}>
          Ver todos os programas
        </button>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#FAFAF8',
    padding: '40px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    maxWidth: '800px',
    width: '100%',
  },
  title: {
    fontSize: '48px',
    color: '#8B7355',
    textAlign: 'center',
    marginBottom: '16px',
  },
  subtitle: {
    fontSize: '20px',
    color: '#666',
    textAlign: 'center',
    marginBottom: '48px',
  },
  programsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    marginBottom: '32px',
  },
  programItem: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  programImage: {
    width: '100px',
    height: '100px',
    borderRadius: '12px',
    objectFit: 'cover',
    marginRight: '24px',
  },
  programInfo: {
    flex: 1,
  },
  programTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: '8px',
  },
  programInstructor: {
    fontSize: '16px',
    color: '#666',
  },
  selectButton: {
    padding: '12px 24px',
    backgroundColor: '#8B7355',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '16px',
  },
  viewAllButton: {
    width: '100%',
    padding: '16px',
    backgroundColor: 'transparent',
    color: '#8B7355',
    border: '2px solid #8B7355',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '16px',
  },
}
