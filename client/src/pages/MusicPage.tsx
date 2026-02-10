import { useState } from 'react'
import { mockMusicTracks, getPopularMusic } from '../data/mockData'
import { MusicTrack } from '../types'

export default function MusicPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | MusicTrack['category']>('all')
  const popularTracks = getPopularMusic()

  const categories = [
    { id: 'all' as const, label: 'Todos', icon: '🎵' },
    { id: 'relaxamento' as const, label: 'Relaxamento', icon: '😌' },
    { id: 'foco' as const, label: 'Foco', icon: '🎯' },
    { id: 'sono' as const, label: 'Sono', icon: '🌙' },
    { id: 'energia' as const, label: 'Energia', icon: '⚡' },
    { id: 'meditacao' as const, label: 'Meditação', icon: '🧘' },
  ]

  const filteredTracks = selectedCategory === 'all'
    ? mockMusicTracks
    : mockMusicTracks.filter(track => track.category === selectedCategory)

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    return `${minutes} min`
  }

  const formatPlays = (plays: number): string => {
    if (plays >= 1000) {
      return `${(plays / 1000).toFixed(1)}k`
    }
    return plays.toString()
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Músicas & Áudios</h1>
        <p style={styles.subtitle}>Relaxamento, foco e bem-estar</p>
      </div>

      {/* Popular Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🔥 Mais Ouvidas</h2>
        <div style={styles.popularGrid}>
          {popularTracks.map((track) => (
            <div key={track.id} style={styles.popularCard}>
              <img src={track.coverImage} alt={track.title} style={styles.popularImage} />
              <div style={styles.popularOverlay}>
                <button style={styles.popularPlayButton}>▶️</button>
              </div>
              {track.isPremium && <div style={styles.premiumBadge}>👑</div>}
              <div style={styles.popularInfo}>
                <h4 style={styles.popularTitle}>{track.title}</h4>
                <p style={styles.popularArtist}>{track.artist}</p>
                <div style={styles.popularFooter}>
                  <span style={styles.popularPlays}>👁️ {formatPlays(track.plays)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div style={styles.section}>
        <div style={styles.categoriesContainer}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              style={{
                ...styles.categoryChip,
                ...(selectedCategory === cat.id ? styles.categoryChipActive : {}),
              }}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Track List */}
      <div style={styles.section}>
        <div style={styles.trackList}>
          {filteredTracks.map((track, index) => (
            <div key={track.id} style={styles.trackItem}>
              <div style={styles.trackRank}>{index + 1}</div>
              <img src={track.coverImage} alt={track.title} style={styles.trackCover} />
              <div style={styles.trackInfo}>
                <h4 style={styles.trackTitle}>{track.title}</h4>
                <div style={styles.trackMeta}>
                  <span style={styles.trackArtist}>{track.artist}</span>
                  <span style={styles.trackMetaSeparator}>•</span>
                  <span style={styles.trackDuration}>{formatDuration(track.duration)}</span>
                </div>
              </div>
              {track.isPremium && <span style={styles.trackPremium}>👑</span>}
              <button style={styles.playButton}>▶️</button>
            </div>
          ))}
        </div>
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
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '20px',
    opacity: 0.9,
  },
  section: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  sectionTitle: {
    fontSize: '32px',
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: '24px',
  },
  popularGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
  },
  popularCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    position: 'relative',
  },
  popularImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  popularOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    opacity: 0,
    transition: 'opacity 0.2s',
  },
  popularPlayButton: {
    fontSize: '48px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  premiumBadge: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    fontSize: '24px',
  },
  popularInfo: {
    padding: '16px',
  },
  popularTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: '4px',
  },
  popularArtist: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '8px',
  },
  popularFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  popularPlays: {
    fontSize: '12px',
    color: '#999',
  },
  categoriesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    justifyContent: 'center',
  },
  categoryChip: {
    padding: '12px 24px',
    backgroundColor: '#fff',
    border: '2px solid #E0E0E0',
    borderRadius: '24px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s',
  },
  categoryChipActive: {
    backgroundColor: '#8B7355',
    borderColor: '#8B7355',
    color: '#fff',
  },
  trackList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
  },
  trackItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px',
    borderBottom: '1px solid #E0E0E0',
    backgroundColor: '#fff',
  },
  trackRank: {
    width: '40px',
    fontSize: '18px',
    fontWeight: '600',
    color: '#999',
    textAlign: 'center',
  },
  trackCover: {
    width: '60px',
    height: '60px',
    borderRadius: '8px',
    objectFit: 'cover',
    marginRight: '16px',
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: '4px',
  },
  trackMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  trackArtist: {
    fontSize: '14px',
    color: '#666',
  },
  trackMetaSeparator: {
    color: '#999',
  },
  trackDuration: {
    fontSize: '14px',
    color: '#999',
  },
  trackPremium: {
    fontSize: '20px',
    marginRight: '16px',
  },
  playButton: {
    fontSize: '24px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
}
