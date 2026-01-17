import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { theme } from '../../styles/theme';
import ProgramCard from '../../components/ProgramCard';
import EmptyState from '../../components/EmptyState';
import { mockPrograms } from '../../data/mockData';
import { Program } from '../../types';

type Tab = 'recents' | 'favorites' | 'downloads';

interface LibraryScreenProps {
  navigation: {
    navigate: (screen: string, params?: { programId?: string }) => void;
  };
}

export default function LibraryScreen({ navigation }: LibraryScreenProps) {
  const [activeTab, setActiveTab] = useState<Tab>('recents');

  // Mock data - substituir por dados reais do usuário
  const recentPrograms = mockPrograms.slice(0, 3);
  const favoritePrograms = mockPrograms.slice(2, 5);
  const downloadedPrograms: Program[] = [];

  const renderContent = () => {
    switch (activeTab) {
      case 'recents':
        return recentPrograms.length > 0 ? (
          recentPrograms.map((program) => (
            <View key={program.id} style={styles.programCardWrapper}>
              <ProgramCard
                program={program}
                onPress={() => navigation.navigate('ProgramDetail', { programId: program.id })}
                horizontal={true}
              />
            </View>
          ))
        ) : (
          <EmptyState
            icon="clock"
            title="Nenhum conteúdo recente"
            description="Os programas que você ouvir aparecerão aqui"
            actionLabel="Explorar"
            onAction={() => navigation.navigate('Explore')}
          />
        );

      case 'favorites':
        return favoritePrograms.length > 0 ? (
          favoritePrograms.map((program) => (
            <View key={program.id} style={styles.programCardWrapper}>
              <ProgramCard
                program={program}
                onPress={() => navigation.navigate('ProgramDetail', { programId: program.id })}
                horizontal={true}
              />
            </View>
          ))
        ) : (
          <EmptyState
            icon="heart"
            title="Nenhum favorito"
            description="Salve seus programas favoritos para acessá-los rapidamente"
            actionLabel="Explorar"
            onAction={() => navigation.navigate('Explore')}
          />
        );

      case 'downloads':
        return downloadedPrograms.length > 0 ? (
          downloadedPrograms.map((program) => (
            <View key={program.id} style={styles.programCardWrapper}>
              <ProgramCard
                program={program}
                onPress={() => navigation.navigate('ProgramDetail', { programId: program.id })}
                horizontal={true}
              />
            </View>
          ))
        ) : (
          <EmptyState
            icon="📥"
            title="Nenhum download"
            description="Baixe programas para ouvir offline"
            actionLabel="Explorar"
            onAction={() => navigation.navigate('Explore')}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Biblioteca</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'recents' && styles.activeTab]}
          onPress={() => setActiveTab('recents')}
        >
          <Text style={[styles.tabText, activeTab === 'recents' && styles.activeTabText]}>
            Recentes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'favorites' && styles.activeTab]}
          onPress={() => setActiveTab('favorites')}
        >
          <Text style={[styles.tabText, activeTab === 'favorites' && styles.activeTabText]}>
            Favoritos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'downloads' && styles.activeTab]}
          onPress={() => setActiveTab('downloads')}
        >
          <Text style={[styles.tabText, activeTab === 'downloads' && styles.activeTabText]}>
            Downloads
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderContent()}
        <View style={{ height: theme.spacing.xl }} />
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
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing['3xl'],
    paddingBottom: theme.spacing.lg,
  },
  title: {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.border,
  },
  activeTab: {
    borderBottomColor: theme.colors.primary,
  },
  tabText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textLight,
  },
  activeTabText: {
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.xl,
  },
  programCardWrapper: {
    marginBottom: theme.spacing.md,
  },
});
