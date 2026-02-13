import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { theme } from '../styles/theme';
import { mockMusicTracks, getPopularMusic, MusicTrack } from '../data/mockData';

interface MusicScreenProps {
  navigation: {
    goBack: () => void;
  };
}

export default function MusicScreen({ navigation }: MusicScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | MusicTrack['category']>('all');
  const popularTracks = getPopularMusic();

  const categories: Array<{ id: 'all' | MusicTrack['category']; label: string; icon: string }> = [
    { id: 'all', label: 'Todos', icon: '🎵' },
    { id: 'relaxamento', label: 'Relaxamento', icon: '😌' },
    { id: 'foco', label: 'Foco', icon: '🎯' },
    { id: 'sono', label: 'Sono', icon: '🌙' },
    { id: 'energia', label: 'Energia', icon: '⚡' },
    { id: 'meditacao', label: 'Meditação', icon: '🧘' },
  ];

  const filteredTracks = selectedCategory === 'all' 
    ? mockMusicTracks 
    : mockMusicTracks.filter(track => track.category === selectedCategory);

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  const formatPlays = (plays: number): string => {
    if (plays >= 1000) {
      return `${(plays / 1000).toFixed(1)}k`;
    }
    return plays.toString();
  };

  const renderTrackItem = ({ item, index }: { item: MusicTrack; index: number }) => (
    <TouchableOpacity style={styles.trackItem}>
      <View style={styles.trackRank}>
        <Text style={styles.trackRankText}>{index + 1}</Text>
      </View>
      <Image source={{ uri: item.coverImage }} style={styles.trackCover} />
      <View style={styles.trackInfo}>
        <Text style={styles.trackTitle} numberOfLines={1}>{item.title}</Text>
        <View style={styles.trackMeta}>
          <Text style={styles.trackArtist} numberOfLines={1}>{item.artist}</Text>
          <Text style={styles.trackMetaSeparator}>•</Text>
          <Text style={styles.trackDuration}>{formatDuration(item.duration)}</Text>
        </View>
      </View>
      {item.isPremium && <Text style={styles.trackPremium}>👑</Text>}
      <TouchableOpacity style={styles.playButton}>
        <Text style={styles.playIcon}>▶️</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Músicas & Áudios</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Popular Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔥 Mais Ouvidas</Text>
          <ScrollView 
            horizontal={true} 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.popularList}
          >
            {popularTracks.map((track) => (
              <TouchableOpacity key={track.id} style={styles.popularCard}>
                <Image source={{ uri: track.coverImage }} style={styles.popularCover} />
                <View style={styles.popularOverlay}>
                  <Text style={styles.popularPlayButton}>▶️</Text>
                </View>
                <View style={styles.popularInfo}>
                  <Text style={styles.popularTitle} numberOfLines={2}>{track.title}</Text>
                  <Text style={styles.popularArtist} numberOfLines={1}>{track.artist}</Text>
                  <View style={styles.popularFooter}>
                    <Text style={styles.popularPlays}>👁️ {formatPlays(track.plays)}</Text>
                    {track.isPremium && <Text style={styles.popularPremium}>👑</Text>}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Category Filter */}
        <View style={styles.section}>
          <ScrollView 
            horizontal={true} 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryChip,
                  selectedCategory === category.id && styles.categoryChipActive,
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={[
                  styles.categoryLabel,
                  selectedCategory === category.id && styles.categoryLabelActive,
                ]}>
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Track List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'all' ? 'Todas as Músicas' : categories.find(c => c.id === selectedCategory)?.label}
          </Text>
          <FlatList
            data={filteredTracks}
            renderItem={renderTrackItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.trackList}
          />
        </View>

        <View style={{ height: theme.spacing['3xl'] }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing['3xl'],
    paddingBottom: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: theme.colors.textInverse,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textInverse,
  },
  headerSpacer: {
    width: 40,
  },
  section: {
    marginTop: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  // Popular Section
  popularList: {
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  popularCard: {
    width: 160,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    marginRight: theme.spacing.md,
  },
  popularCover: {
    width: '100%',
    height: 160,
    backgroundColor: theme.colors.border,
  },
  popularOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popularPlayButton: {
    fontSize: 40,
    opacity: 0.9,
  },
  popularInfo: {
    padding: theme.spacing.md,
  },
  popularTitle: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
    height: 34,
  },
  popularArtist: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  popularFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  popularPlays: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
  },
  popularPremium: {
    fontSize: 16,
  },
  // Category Filter
  categoryList: {
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginRight: theme.spacing.sm,
  },
  categoryChipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: theme.spacing.xs,
  },
  categoryLabel: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text,
  },
  categoryLabelActive: {
    color: theme.colors.textInverse,
  },
  // Track List
  trackList: {
    paddingHorizontal: theme.spacing.lg,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  trackRank: {
    width: 32,
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  trackRankText: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textSecondary,
  },
  trackCover: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.border,
    marginRight: theme.spacing.md,
  },
  trackInfo: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  trackTitle: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  trackMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackArtist: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  trackMetaSeparator: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginHorizontal: theme.spacing.xs,
  },
  trackDuration: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  trackPremium: {
    fontSize: 20,
    marginRight: theme.spacing.sm,
  },
  playButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: 24,
  },
});
