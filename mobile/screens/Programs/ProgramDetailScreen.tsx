import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { theme } from '../../styles/theme';
import Button from '../../components/Button';
import { mockPrograms, getEpisodesByProgramId } from '../../data/mockData';

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
});
