import { useParams, useNavigate } from 'react-router-dom'
import { mockPrograms, getReviewsByProgramId, getProgramRating } from '../data/mockData'

export default function ProgramDetailPage() {
  const { programId } = useParams()
  const navigate = useNavigate()
  const program = mockPrograms.find(p => p.id === programId)
  const reviews = getReviewsByProgramId(programId || '')
  const rating = getProgramRating(programId || '')

  if (!program) {
    return <div style={styles.container}>Programa não encontrado</div>
  }

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes} min`
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours}h ${remainingMinutes}m`
  }

  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={styles.star}>
          {i <= Math.floor(rating) ? '⭐' : '☆'}
        </span>
      )
    }
    return <div style={styles.starsContainer}>{stars}</div>
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Hoje'
    if (diffDays === 1) return 'Ontem'
    if (diffDays < 7) return `${diffDays} dias atrás`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} semanas atrás`
    return date.toLocaleDateString('pt-BR')
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button onClick={() => navigate(-1)} style={styles.backButton}>
          ← Voltar
        </button>
      </div>

      {/* Cover Image */}
      <div style={styles.coverContainer}>
        <img src={program.coverImage} alt={program.title} style={styles.coverImage} />
        {program.isPremium && (
          <div style={styles.premiumBadge}>👑 PREMIUM</div>
        )}
      </div>

      {/* Content */}
      <div style={styles.content}>
        {/* Title && Meta */}
        <div style={styles.titleSection}>
          <h1 style={styles.title}>{program.title}</h1>
          {program.instructor && (
            <p style={styles.instructor}>Por {program.instructor}</p>
          )}
        </div>

        {/* Meta Info */}
        <div style={styles.metaInfo}>
          <div style={styles.metaItem}>
            <span>⏱️ {formatDuration(program.duration)}</span>
          </div>
          {program.episodeCount && program.episodeCount > 1 && (
            <div style={styles.metaItem}>
              <span>📚 {program.episodeCount} episódios</span>
            </div>
          )}
          <div style={styles.metaItem}>
            <span>🎧 Áudio</span>
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={() => navigate('/audio-player')}
          style={styles.playButton}
        >
          {program.isPremium ? 'Desbloquear Conteúdo' : 'Reproduzir'}
        </button>

        {/* Description */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Sobre</h3>
          <p style={styles.description}>{program.description}</p>
        </div>

        {/* Tags */}
        {program.tags && program.tags.length > 0 && (
          <div style={styles.section}>
            <div style={styles.tags}>
              {program.tags.map((tag, index) => (
                <div key={index} style={styles.tag}>
                  {tag}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ratings */}
        {rating && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Avaliações</h3>
            
            <div style={styles.ratingSummary}>
              <div style={styles.ratingOverview}>
                <div style={styles.ratingNumber}>{rating.averageRating.toFixed(1)}</div>
                {renderStars(rating.averageRating)}
                <div style={styles.ratingCount}>{rating.totalReviews} avaliações</div>
              </div>

              <div style={styles.ratingDistribution}>
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = rating.ratingDistribution[star as keyof typeof rating.ratingDistribution]
                  const percentage = (count / rating.totalReviews) * 100
                  return (
                    <div key={star} style={styles.distributionRow}>
                      <span style={styles.distributionStar}>{star}⭐</span>
                      <div style={styles.distributionBar}>
                        <div style={{ ...styles.distributionFill, width: `${percentage}%` }} />
                      </div>
                      <span style={styles.distributionCount}>{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Reviews/Comments */}
        {reviews.length > 0 && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Comentários ({reviews.length})</h3>
            
            {reviews.map((review) => (
              <div key={review.id} style={styles.reviewCard}>
                <div style={styles.reviewHeader}>
                  <img 
                    src={review.userAvatar || 'https://i.pravatar.cc/150'} 
                    alt={review.userName}
                    style={styles.reviewAvatar}
                  />
                  <div style={styles.reviewHeaderInfo}>
                    <div style={styles.reviewUserName}>{review.userName}</div>
                    <div style={styles.reviewMeta}>
                      {renderStars(review.rating)}
                      <span style={styles.reviewDate}>{formatDate(review.createdAt)}</span>
                    </div>
                  </div>
                </div>

                <p style={styles.reviewComment}>{review.comment}</p>
                
                {review.experience && (
                  <div style={styles.reviewExperienceBox}>
                    <div style={styles.reviewExperienceLabel}>💭 Experiência:</div>
                    <p style={styles.reviewExperience}>{review.experience}</p>
                  </div>
                )}

                <div style={styles.reviewFooter}>
                  <button style={styles.reviewLikeButton}>
                    <span>👍</span>
                    <span style={styles.reviewLikeText}>{review.likes}</span>
                  </button>
                </div>
              </div>
            ))}

            <button style={styles.addReviewButton}>
              ✍️ Compartilhar minha experiência
            </button>
          </div>
        )}
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
    padding: '20px',
  },
  backButton: {
    padding: '12px 24px',
    backgroundColor: '#fff',
    border: '2px solid #E0E0E0',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
  },
  coverContainer: {
    position: 'relative',
    width: '100%',
    height: '400px',
    overflow: 'hidden',
  },
  coverImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  premiumBadge: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    backgroundColor: '#D4A373',
    color: '#2D2D2D',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
  },
  content: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  titleSection: {
    marginBottom: '24px',
  },
  title: {
    fontSize: '48px',
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: '8px',
  },
  instructor: {
    fontSize: '20px',
    color: '#666',
  },
  metaInfo: {
    display: 'flex',
    gap: '24px',
    marginBottom: '32px',
    flexWrap: 'wrap',
  },
  metaItem: {
    fontSize: '16px',
    color: '#666',
  },
  playButton: {
    width: '100%',
    padding: '20px',
    backgroundColor: '#8B7355',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginBottom: '40px',
  },
  section: {
    marginBottom: '40px',
  },
  sectionTitle: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: '16px',
  },
  description: {
    fontSize: '18px',
    color: '#666',
    lineHeight: '1.6',
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
  },
  tag: {
    backgroundColor: '#fff',
    padding: '8px 16px',
    borderRadius: '20px',
    border: '1px solid #E0E0E0',
    fontSize: '14px',
  },
  starsContainer: {
    display: 'flex',
    gap: '4px',
  },
  star: {
    fontSize: '16px',
  },
  ratingSummary: {
    display: 'grid',
    gridTemplateColumns: '200px 1fr',
    gap: '40px',
    backgroundColor: '#fff',
    padding: '32px',
    borderRadius: '12px',
  },
  ratingOverview: {
    textAlign: 'center',
    borderRight: '1px solid #E0E0E0',
    paddingRight: '32px',
  },
  ratingNumber: {
    fontSize: '64px',
    fontWeight: 'bold',
    color: '#8B7355',
    marginBottom: '8px',
  },
  ratingCount: {
    fontSize: '14px',
    color: '#666',
    marginTop: '8px',
  },
  ratingDistribution: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  distributionRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  distributionStar: {
    fontSize: '14px',
    width: '50px',
  },
  distributionBar: {
    flex: 1,
    height: '10px',
    backgroundColor: '#E0E0E0',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  distributionFill: {
    height: '100%',
    backgroundColor: '#D4A373',
  },
  distributionCount: {
    fontSize: '14px',
    color: '#666',
    width: '30px',
    textAlign: 'right',
  },
  reviewCard: {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '12px',
    marginBottom: '16px',
    border: '1px solid #E0E0E0',
  },
  reviewHeader: {
    display: 'flex',
    marginBottom: '16px',
  },
  reviewAvatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    marginRight: '16px',
  },
  reviewHeaderInfo: {
    flex: 1,
  },
  reviewUserName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: '4px',
  },
  reviewMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  reviewDate: {
    fontSize: '14px',
    color: '#999',
  },
  reviewComment: {
    fontSize: '16px',
    color: '#2D2D2D',
    lineHeight: '1.6',
    marginBottom: '12px',
  },
  reviewExperienceBox: {
    backgroundColor: '#FAFAF8',
    padding: '16px',
    borderRadius: '8px',
    borderLeft: '3px solid #8B7355',
    marginBottom: '12px',
  },
  reviewExperienceLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#8B7355',
    marginBottom: '8px',
  },
  reviewExperience: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.5',
    fontStyle: 'italic',
  },
  reviewFooter: {
    display: 'flex',
  },
  reviewLikeButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
  reviewLikeText: {
    color: '#666',
  },
  addReviewButton: {
    width: '100%',
    padding: '20px',
    backgroundColor: '#fff',
    color: '#8B7355',
    border: '2px dashed #8B7355',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '16px',
  },
}
