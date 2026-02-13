import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { theme } from '../../styles/theme';import Icon from '../../components/Icon';import ProgramCard from '../../components/ProgramCard';
import Input from '../../components/Input';
import { mockPrograms, categories, getProgramsByCategory } from '../../data/mockData';
import { ProgramCategory } from '../../types';

interface ExploreScreenProps {
  navigation: {
    navigate: (screen: string, params?: { programId?: string }) => void;
  };
  route?: {
    params?: {
      category?: ProgramCategory;
    };
  };
}

export default function ExploreScreen({ navigation, route }: ExploreScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProgramCategory | null>(
    route?.params?.category || null
  );

  const filteredPrograms = selectedCategory
    ? getProgramsByCategory(selectedCategory)
    : mockPrograms.filter(program =>
        program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Explorar</Text>
        <Input
          placeholder="Buscar meditações, músicas..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categorias</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.categories}>
            <TouchableOpacity
              style={[styles.categoryFilter, !selectedCategory && styles.categoryFilterActive]}
              onPress={() => setSelectedCategory(null)}
            >
              <Text style={[styles.categoryFilterText, !selectedCategory && styles.categoryFilterTextActive]}>
                Todas
              </Text>
            </TouchableOpacity>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryFilter,
                  selectedCategory === category.id && styles.categoryFilterActive,
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={styles.categoryFilterIcon}>{category.icon}</Text>
                <Text
                  style={[
                    styles.categoryFilterText,
                    selectedCategory === category.id && styles.categoryFilterTextActive,
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Results */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {selectedCategory
              ? categories.find(c => c.id === selectedCategory)?.name
              : searchQuery
              ? `Resultados para "${searchQuery}"`
              : 'Todos os programas'}
          </Text>
          <View style={styles.programsGrid}>
            {filteredPrograms.length > 0 ? (
              filteredPrograms.map((program) => (
                <View key={program.id} style={styles.programCardWrapper}>
                  <ProgramCard
                    program={program}
                    onPress={() => navigation.navigate('ProgramDetail', { programId: program.id })}
                    horizontal={true}
                  />
                </View>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Icon name="search" size={64} color={theme.colors.textSecondary} />
                <Text style={styles.emptyTitle}>Nenhum resultado encontrado</Text>
                <Text style={styles.emptyText}>Tente buscar por outros termos</Text>
              </View>
            )}
          </View>
        </View>

        {/* Popular Tags */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tags populares</Text>
          <View style={styles.tags}>
            {['Tranquilidade', 'Sono', 'Foco', 'Relaxamento', 'Manhã', 'Noite', 'Respiração'].map((tag) => (
              <TouchableOpacity key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

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
    marginBottom: theme.spacing.md,
  },
  searchInput: {
    marginTop: theme.spacing.md,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
    paddingHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.md,
  },
  categories: {
    paddingLeft: theme.spacing.xl,
  },
  categoryFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    marginRight: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  categoryFilterActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  categoryFilterIcon: {
    fontSize: 16,
    marginRight: theme.spacing.xs,
  },
  categoryFilterText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text,
  },
  categoryFilterTextActive: {
    color: theme.colors.textInverse,
  },
  programsGrid: {
    paddingHorizontal: theme.spacing.xl,
  },
  programCardWrapper: {
    marginBottom: theme.spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: theme.spacing['4xl'],
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: theme.spacing.lg,
  },
  emptyTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  emptyText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.spacing.xl,
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
});
