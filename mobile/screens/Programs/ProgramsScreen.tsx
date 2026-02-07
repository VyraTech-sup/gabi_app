import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../../styles/theme';
import ProgramCard from '../../components/ProgramCard';
import { mockPrograms } from '../../data/mockData';

interface ProgramsScreenProps {
  navigation: {
    navigate: (screen: string, params?: Record<string, unknown>) => void;
    goBack: () => void;
  };
}

export default function ProgramsScreen({ navigation }: ProgramsScreenProps) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Todos os Programas</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.listContainer}>
          {mockPrograms.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              onPress={() => navigation.navigate('ProgramDetail', { programId: program.id })}
            />
          ))}
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
  },
  listContainer: {
    paddingHorizontal: theme.spacing.lg,
  },
});
