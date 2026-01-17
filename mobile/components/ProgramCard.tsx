import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';
import { Program } from '../types';

interface ProgramCardProps {
  program: Program;
  onPress: () => void;
  horizontal?: boolean;
}

export default function ProgramCard({ program, onPress, horizontal = false }: ProgramCardProps) {
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  if (horizontal) {
    return (
      <TouchableOpacity style={styles.horizontalCard} onPress={onPress} activeOpacity={0.8}>
        <Image source={{ uri: program.coverImage }} style={styles.horizontalImage} />
        <View style={styles.horizontalContent}>
          <Text style={styles.title} numberOfLines={2}>{program.title}</Text>
          <Text style={styles.description} numberOfLines={2}>{program.description}</Text>
          <View style={styles.meta}>
            {program.isPremium && (
              <View style={styles.premiumBadge}>
                <Text style={styles.premiumText}>PREMIUM</Text>
              </View>
            )}
            <Text style={styles.duration}>{formatDuration(program.duration)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: program.coverImage }} style={styles.image} />
        {program.isPremium && (
          <View style={styles.premiumOverlay}>
            <Text style={styles.premiumOverlayText}>👑 Premium</Text>
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{program.title}</Text>
        <Text style={styles.instructor} numberOfLines={1}>{program.instructor || 'All Mind'}</Text>
        <View style={styles.footer}>
          <Text style={styles.duration}>{formatDuration(program.duration)}</Text>
          {program.episodeCount && program.episodeCount > 1 && (
            <Text style={styles.episodes}>{program.episodeCount} episódios</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 180,
    marginRight: theme.spacing.md,
    backgroundColor: theme.colors.surface, // #2D4A57
    borderRadius: theme.borderRadius.lg, // 16
    borderWidth: 2, // AlmaSense: borda branca
    borderColor: theme.colors.border, // #FFFFFF
    overflow: 'hidden',
    ...theme.shadows.md,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 160,
    backgroundColor: theme.colors.border,
  },
  premiumOverlay: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    backgroundColor: theme.colors.accent1,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  premiumOverlayText: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  content: {
    padding: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  instructor: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  duration: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textLight,
  },
  episodes: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textLight,
  },
  
  // Horizontal variant
  horizontalCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface, // #2D4A57
    borderRadius: theme.borderRadius.lg, // 16
    borderWidth: 2, // AlmaSense: borda branca
    borderColor: theme.colors.border, // #FFFFFF
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  horizontalImage: {
    width: 120,
    height: 120,
    backgroundColor: theme.colors.border,
  },
  horizontalContent: {
    flex: 1,
    padding: theme.spacing.md,
    justifyContent: 'space-between',
  },
  description: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  premiumBadge: {
    backgroundColor: theme.colors.accent1,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
  },
  premiumText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
  },
});
