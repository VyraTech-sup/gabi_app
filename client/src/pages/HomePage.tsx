import { useNavigate } from 'react-router-dom'
import { mockPrograms, getFeaturedPrograms } from '../data/mockData'

export default function HomePage() {
  const navigate = useNavigate()
  const featuredPrograms = getFeaturedPrograms()

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>All Mind</h1>
        <p style={styles.headerSubtitle}>Transforme sua mente</p>
      </div>

      {/* Featured Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Em Destaque</h2>
        <div style={styles.programsGrid}>
          {featuredPrograms.map((program) => (
            <div
              key={program.id}
              style={styles.programCard}
              onClick={() => navigate(`/program/${program.id}`)}
            >
              <img src={program.coverImage} alt={program.title} style={styles.programImage} />
              {program.isPremium && (
                <div style={styles.premiumBadge}>👑</div>
              )}
              <div style={styles.programInfo}>
                <h3 style={styles.programTitle}>{program.title}</h3>
                {program.instructor && (
                  <p style={styles.programInstructor}>{program.instructor}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Programs */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Todos os Programas</h2>
          <button onClick={() => navigate('/programs')} style={styles.viewAllButton}>
            Ver todos →
          </button>
        </div>
        <div style={styles.programsList}>
          {mockPrograms.slice(0, 5).map((program) => (
            <div
              key={program.id}
              style={styles.programListItem}
              onClick={() => navigate(`/program/${program.id}`)}
            >
              <img src={program.coverImage} alt={program.title} style={styles.listItemImage} />
              <div style={styles.listItemInfo}>
                <h4 style={styles.listItemTitle}>{program.title}</h4>
                <p style={styles.listItemInstructor}>{program.instructor}</p>
              </div>
              <button style={styles.playButton}>▶️</button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Access */}
      <div style={styles.quickAccess}>
        <button onClick={() => navigate('/music')} style={styles.quickAccessButton}>
          🎵 Músicas
        </button>
        <button onClick={() => navigate('/programs')} style={styles.quickAccessButton}>
          🧘 Meditações
        </button>
        <button onClick={() => navigate('/programs')} style={styles.quickAccessButton}>
          🌙 Sono
        </button>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#FAFAF8',
    paddingBottom: '40px',
  },
  header: {
    backgroundColor: '#8B7355',
    color: '#fff',
    padding: '60px 20px',
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  headerSubtitle: {
    fontSize: '20px',
    opacity: 0.9,
  },
  section: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  sectionTitle: {
    fontSize: '32px',
    fontWeight: '600',
    color: '#2D2D2D',
  },
  viewAllButton: {
    padding: '12px 24px',
    backgroundColor: 'transparent',
    color: '#8B7355',
    border: '2px solid #8B7355',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '16px',
  },
  programsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px',
  },
  programCard: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    position: 'relative',
  },
  programImage: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
  },
  premiumBadge: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    fontSize: '24px',
  },
  programInfo: {
    padding: '16px',
  },
  programTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: '4px',
  },
  programInstructor: {
    fontSize: '14px',
    color: '#666',
  },
  programsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  programListItem: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '16px',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  listItemImage: {
    width: '80px',
    height: '80px',
    borderRadius: '8px',
    objectFit: 'cover',
    marginRight: '16px',
  },
  listItemInfo: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: '4px',
  },
  listItemInstructor: {
    fontSize: '14px',
    color: '#666',
  },
  playButton: {
    fontSize: '24px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  quickAccess: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
  },
  quickAccessButton: {
    padding: '20px',
    backgroundColor: '#8B7355',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
  },
}
