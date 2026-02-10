import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { theme } from '../../styles/theme';
import Button from '../../components/Button';
import { mockPrograms, getEpisodesByProgramId, getReviewsByProgramId, getProgramRating } from '../../data/mockData';

interface ProgramDetailScreenProps {
  route: {
    params: {
      programId: string;
    };
  };
  navigation: {
    navigate: (screen: string, params?: Record<string, unknown>) => void;
    goBack: () => void;
  };
}

export default function ProgramDetailScreen({ route, navigation }: ProgramDetailScreenProps) {
  const { programId } = route.params;
  const program = mockPrograms.find(p => p.id === programId);
  const episodes = getEpisodesByProgramId(programId);
  const reviews = getReviewsByProgramId(programId);
  const rating = getProgramRating(programId);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!program) {
    return (
      <View style={styles.container}>
        <Text>Programa não encontrado</Text>
      </View>
    );
  }

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text key={i} style={styles.star}>
          {i <= Math.floor(rating) ? '⭐' : i <= rating ? '⭐' : '☆'}
        </Text>
      );
    }
    return <View style={styles.starsContainer}>{stars}</View>;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoje';
    if (diffDays === 1) return 'Ontem';
    if (diffDays < 7) return `${diffDays} dias atrás`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} semanas atrás`;
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cover Image */}
        <View style={styles.coverContainer}>
          <Image source={{ uri: program.coverImage }} style={styles.coverImage} />
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          {program.isPremium && (
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumBadgeText}>👑 PREMIUM</Text>
            </View>
          )}
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text style={styles.title}>{program.title}</Text>
              {program.instructor && (
                <Text style={styles.instructor}>Por {program.instructor}</Text>
              )}
            </View>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => setIsFavorite(!isFavorite)}
            >
              <Text style={styles.favoriteIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>
          </View>

          {/* Meta Info */}
          <View style={styles.metaInfo}>
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>⏱️</Text>
              <Text style={styles.metaText}>{formatDuration(program.duration)}</Text>
            </View>
            {program.episodeCount && program.episodeCount > 1 && (
              <View style={styles.metaItem}>
                <Text style={styles.metaIcon}>📚</Text>
                <Text style={styles.metaText}>{program.episodeCount} episódios</Text>
              </View>
            )}
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>🎧</Text>
              <Text style={styles.metaText}>Áudio</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <Button
              title={program.isPremium ? 'Desbloquear Conteúdo' : 'Reproduzir'}
              onPress={() => navigation.navigate('Player', { programId: program.id })}
              fullWidth={true}
            />
            <View style={styles.secondaryActions}>
              <TouchableOpacity style={styles.secondaryAction}>
                <Text style={styles.secondaryActionIcon}>📥</Text>
                <Text style={styles.secondaryActionText}>Download</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryAction}>
                <Text style={styles.secondaryActionIcon}>➕</Text>
                <Text style={styles.secondaryActionText}>Playlist</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryAction}>
                <Text style={styles.secondaryActionIcon}>↗️</Text>
                <Text style={styles.secondaryActionText}>Compartilhar</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sobre</Text>
            <Text style={styles.description}>{program.description}</Text>
          </View>

          {/* Tags */}
          {program.tags && program.tags.length > 0 && (
            <View style={styles.section}>
              <View style={styles.tags}>
                {program.tags.map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Episodes */}
          {episodes.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Episódios</Text>
              {episodes.map((episode, index) => (
                <TouchableOpacity
                  key={episode.id}
                  style={styles.episodeItem}
                  onPress={() => navigation.navigate('Player', { 
                    programId: program.id, 
                    episodeId: episode.id 
                  })}
                >
                  <View style={styles.episodeNumber}>
                    <Text style={styles.episodeNumberText}>{index + 1}</Text>
                  </View>
                  <Image source={{ uri: episode.coverImage }} style={styles.episodeImage} />
                  <View style={styles.episodeInfo}>
                    <Text style={styles.episodeTitle} numberOfLines={1}>{episode.title}</Text>
                    <Text style={styles.episodeMeta}>{formatDuration(episode.duration)}</Text>
                  </View>
                  {episode.isPremium && (
                    <Text style={styles.episodePremium}>👑</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Ratings & Reviews */}
          {rating && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Avaliações</Text>
              
              {/* Rating Summary */}
              <View style={styles.ratingSummary}>
                <View style={styles.ratingOverview}>
                  <Text style={styles.ratingNumber}>{rating.averageRating.toFixed(1)}</Text>
                  {renderStars(rating.averageRating)}
                  <Text style={styles.ratingCount}>{rating.totalReviews} avaliações</Text>
                </View>
                
                {/* Rating Distribution */}
                <View style={styles.ratingDistribution}>
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = rating.ratingDistribution[star as keyof typeof rating.ratingDistribution];
                    const percentage = (count / rating.totalReviews) * 100;
                    return (
                      <View key={star} style={styles.distributionRow}>
                        <Text style={styles.distributionStar}>{star}⭐</Text>
                        <View style={styles.distributionBar}>
                          <View style={[styles.distributionFill, { width: `${percentage}%` }]} />
                        </View>
                        <Text style={styles.distributionCount}>{count}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>
          )}

          {/* Reviews/Comments */}
          {reviews.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Comentários ({reviews.length})</Text>
              
              {reviews.map((review) => (
                <View key={review.id} style={styles.reviewCard}>
                  {/* Review Header */}
                  <View style={styles.reviewHeader}>
                    <Image 
                      source={{ uri: review.userAvatar || 'https://i.pravatar.cc/150' }} 
                      style={styles.reviewAvatar} 
                    />
                    <View style={styles.reviewHeaderInfo}>
                      <Text style={styles.reviewUserName}>{review.userName}</Text>
                      <View style={styles.reviewMeta}>
                        {renderStars(review.rating)}
                        <Text style={styles.reviewDate}>{formatDate(review.createdAt)}</Text>
                      </View>
                    </View>
                  </View>
                  
                  {/* Review Content */}
                  <Text style={styles.reviewComment}>{review.comment}</Text>
                  {review.experience && (
                    <View style={styles.reviewExperienceBox}>
                      <Text style={styles.reviewExperienceLabel}>💭 Experiência:</Text>
                      <Text style={styles.reviewExperience}>{review.experience}</Text>
                    </View>
                  )}
                  
                  {/* Review Footer */}
                  <View style={styles.reviewFooter}>
                    <TouchableOpacity style={styles.reviewLikeButton}>
                      <Text style={styles.reviewLikeIcon}>👍</Text>
                      <Text style={styles.reviewLikeText}>{review.likes}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
              
              {/* Add Review Button */}
              <TouchableOpacity style={styles.addReviewButton}>
                <Text style={styles.addReviewText}>✍️ Compartilhar minha experiência</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={{ height: theme.spacing.xl }} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  coverContainer: {
    position: 'relative',
    width: '100%',
    height: 300,
  },
  coverImage: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.border,
  },
  backButton: {
    position: 'absolute',
    top: theme.spacing['3xl'],
    left: theme.spacing.lg,
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: theme.colors.textInverse,
  },
  premiumBadge: {
    position: 'absolute',
    top: theme.spacing['3xl'],
    right: theme.spacing.lg,
    backgroundColor: theme.colors.accent1,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  premiumBadgeText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
  },
  content: {
    paddingHorizontal: theme.spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: theme.spacing.lg,
  },
  headerText: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  instructor: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
  },
  favoriteButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    fontSize: 28,
  },
  metaInfo: {
    flexDirection: 'row',
    marginTop: theme.spacing.md,
    gap: theme.spacing.lg,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: {
    fontSize: 16,
    marginRight: theme.spacing.xs,
  },
  metaText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  actions: {
    marginTop: theme.spacing.xl,
  },
  secondaryActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: theme.spacing.md,
  },
  secondaryAction: {
    alignItems: 'center',
  },
  secondaryActionIcon: {
    fontSize: 24,
    marginBottom: theme.spacing.xs,
  },
  secondaryActionText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
  },
  section: {
    marginTop: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  description: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    lineHeight: theme.typography.lineHeight.relaxed * theme.typography.fontSize.base,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  tag: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  tagText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text,
  },
  episodeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.sm,
  },
  episodeNumber: {
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  episodeNumberText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textInverse,
  },
  episodeImage: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.border,
    marginRight: theme.spacing.md,
  },
  episodeInfo: {
    flex: 1,
  },
  episodeTitle: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  episodeMeta: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  episodePremium: {
    fontSize: 20,
  },
  // Rating Styles
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 16,
    marginRight: 2,
  },
  ratingSummary: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    gap: theme.spacing.xl,
  },
  ratingOverview: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: theme.spacing.lg,
    borderRightWidth: 1,
    borderRightColor: theme.colors.border,
  },
  ratingNumber: {
    fontSize: 48,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  ratingCount: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  ratingDistribution: {
    flex: 1,
    gap: theme.spacing.sm,
  },
  distributionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  distributionStar: {
    fontSize: theme.typography.fontSize.sm,
    width: 40,
  },
  distributionBar: {
    flex: 1,
    height: 8,
    backgroundColor: theme.colors.border,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  distributionFill: {
    height: '100%',
    backgroundColor: theme.colors.accent1,
  },
  distributionCount: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    width: 30,
    textAlign: 'right',
  },
  // Review Styles
  reviewCard: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  reviewHeader: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  reviewAvatar: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.full,
    marginRight: theme.spacing.md,
    backgroundColor: theme.colors.border,
  },
  reviewHeaderInfo: {
    flex: 1,
  },
  reviewUserName: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  reviewMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  reviewDate: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  reviewComment: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text,
    lineHeight: theme.typography.lineHeight.relaxed * theme.typography.fontSize.base,
    marginBottom: theme.spacing.sm,
  },
  reviewExperienceBox: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  reviewExperienceLabel: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  reviewExperience: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    lineHeight: theme.typography.lineHeight.relaxed * theme.typography.fontSize.sm,
    fontStyle: 'italic',
  },
  reviewFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  reviewLikeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  reviewLikeIcon: {
    fontSize: 18,
  },
  reviewLikeText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  addReviewButton: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: theme.colors.border,
    marginTop: theme.spacing.md,
  },
  addReviewText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.primary,
  },
});
