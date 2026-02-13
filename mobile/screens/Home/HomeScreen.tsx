import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Linking } from 'react-native';
import { theme } from '../../styles/theme';
import Icon from '../../components/Icon';
import Button from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext';
import { getActiveAudios } from '../../data/audioLibrary';

interface HomeScreenProps {
  navigation: {
    navigate: (screen: string, params?: Record<string, unknown>) => void;
  };
}

// Use the canonical static audio list as the single source of truth for Home
const activeAudios = getActiveAudios();
const todayStory = activeAudios[0] || null;
const watchedStories = activeAudios.slice(1);

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { hasActiveSubscription, user } = useAuth();

  const handleWatchStory = (audioId?: string, audioTitle?: string) => {
    if (!hasActiveSubscription) {
      // keep existing behavior (unlock flow)
      return;
    }

    if (audioId) {
      navigation.navigate('AudioPlayer', { audioId, audioTitle });
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.greeting}>Olá, {user?.name || 'Maria'}</Text>
          <Text style={styles.subtitle}>Como você está se sentindo hoje?</Text>
        </View>
        
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.notificationButton}>
            <Icon name="bell" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.profileButton}>
            <Icon name="user" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Banner de Trial Expirado */}
      {!hasActiveSubscription && (
        <View style={styles.trialExpiredBanner}>
          <Icon name="lock" size={20} color={theme.colors.text} />
          <Text style={styles.trialExpiredText}>Sua avaliação gratuita expirou</Text>
        </View>
      )}

      {/* Card Principal - Story do Dia */}
      <ImageBackground source={{ uri: 'https://picsum.photos/seed/story1/600/800' }} style={styles.storyCard} imageStyle={styles.storyCardImage}>
        <View style={styles.storyOverlay}>
          {!hasActiveSubscription && (
            <View style={styles.storyBadge}><Text style={styles.storyBadgeText}>Story 1</Text></View>
          )}
          
          <View style={styles.storyContent}>
            <Text style={styles.storyTitle}>{todayStory?.title || 'Story do Dia'}</Text>
            
            <View style={styles.specialistPill}><Text style={styles.specialistText}>Gabriela Artz</Text></View>
            
            <Button title="Ouvir" onPress={() => handleWatchStory(todayStory?.id, todayStory?.title)} variant="primary" size="large" style={styles.watchButton} />
          </View>
        </View>
      </ImageBackground>

      {/* Stories Assistidos */}
      {watchedStories.length > 0 && (
        <View style={styles.watchedSection}>
          <Text style={styles.watchedTitle}>Stories Assistidos</Text>
          {watchedStories.map((story) => (
            <View key={story.id} style={styles.watchedStoryItem}>
              <ImageBackground
                source={{ uri: 'https://picsum.photos/seed/story'+story.id+'/200/200' }}
                style={styles.watchedThumbnail}
                imageStyle={styles.watchedThumbnailImage}
              />
              <View style={styles.watchedStoryInfo}>
                <Text style={styles.watchedStoryTitle}>{story.title}</Text>
                <Text style={styles.watchedStorySpecialist}>Gabriela Artz</Text>
              </View>
              <TouchableOpacity
                style={styles.rewatchButton}
                onPress={() => handleWatchStory(story.id, story.title)}
              >
                <Text style={styles.rewatchButtonText}>Ouvir</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {/* Card de Conversão */}
      {!hasActiveSubscription && (
        <View style={styles.unlockCard}>
          <Text style={styles.unlockTitle}>Desbloqueie sua jornada completa em All Mind</Text>
          <Button 
            title="Assinar →" 
            variant="primary" 
            size="large" 
            fullWidth={true} 
            style={styles.unlockButton}
            onPress={() => navigation.navigate('UnlockAlmaSense')}
          />
        </View>
      )}

      {/* Link para Spotify */}
      <TouchableOpacity style={styles.spotifyCard} onPress={() => Linking.openURL('https://open.spotify.com/show/seu-podcast')}>
        <Icon name="music" size={24} color="#1DB954" />
        <Text style={styles.spotifyText}>Ouça também no Spotify</Text>
        <Icon name="external-link" size={20} color={theme.colors.textSecondary} />
      </TouchableOpacity>

      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing['3xl'],
    paddingBottom: theme.spacing.lg,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trialExpiredBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F39C12',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    marginHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.lg,
  },
  trialExpiredText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
    marginLeft: theme.spacing.sm,
  },
  storyCard: {
    marginHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
    height: 500,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
  },
  storyCardImage: {
    borderRadius: theme.borderRadius.xl,
  },
  storyOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
    padding: theme.spacing.xl,
  },
  storyBadge: {
    position: 'absolute',
    top: theme.spacing.lg,
    right: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
  },
  storyBadgeText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
  },
  storyContent: {
    alignItems: 'center',
  },
  storyTitle: {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  specialistPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    marginBottom: theme.spacing.xl,
  },
  specialistText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text,
  },
  watchButton: {
    minWidth: 200,
  },
  watchedSection: {
    paddingHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  watchedTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  watchedStoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  watchedThumbnail: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
    marginRight: theme.spacing.md,
  },
  watchedThumbnailImage: {
    borderRadius: theme.borderRadius.full,
  },
  watchedStoryInfo: {
    flex: 1,
  },
  watchedStoryTitle: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  watchedStorySpecialist: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  rewatchButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  rewatchButtonText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.primary,
  },
  unlockCard: {
    marginHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
    backgroundColor: theme.colors.secondaryLight,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    ...theme.shadows.lg,
  },
  unlockTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textInverse,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  unlockButton: {
    backgroundColor: theme.colors.primary,
  },
  spotifyCard: {
    marginHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    ...theme.shadows.md,
  },
  spotifyText: {
    flex: 1,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text,
  },
});
