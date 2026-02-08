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

  // Layout tipo Spotify: lista vertical, capa à esquerda, infos à direita
  return (
    <TouchableOpacity style={styles.spotifyCard} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: program.coverImage }} style={styles.spotifyImage} />
      <View style={styles.spotifyContent}>
        <View style={styles.spotifyHeader}>
          <Text style={styles.spotifyTitle} numberOfLines={1}>{program.title}</Text>
          {program.isPremium && (
            <View style={styles.spotifyPremiumBadge}>
              <Text style={styles.spotifyPremiumText}>PREMIUM</Text>
            </View>
          )}
        </View>
        <Text style={styles.spotifyDescription} numberOfLines={1}>{program.description}</Text>
        <View style={styles.spotifyMeta}>
          <Text style={styles.spotifyDuration}>{formatDuration(program.duration)}</Text>
          {program.episodeCount && program.episodeCount > 1 && (
            <Text style={styles.spotifyEpisodes}>{program.episodeCount} episódios</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  spotifyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  spotifyImage: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: theme.colors.border,
    marginRight: theme.spacing.md,
  },
  spotifyContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  spotifyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  spotifyTitle: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
    flex: 1,
  },
  spotifyPremiumBadge: {
    backgroundColor: theme.colors.accent1,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
    marginLeft: theme.spacing.xs,
  },
  spotifyPremiumText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
  },
  spotifyDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: 2,
  },
  spotifyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  spotifyDuration: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textLight,
    marginRight: theme.spacing.sm,
  },
  spotifyEpisodes: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textLight,
  },
});
