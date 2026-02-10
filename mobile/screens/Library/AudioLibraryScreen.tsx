import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../styles/theme';
import { getActiveAudios } from '../../data/audioLibrary';
import Svg, { Path, Circle } from 'react-native-svg';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 2 colunas com padding

export default function AudioLibraryScreen() {
  const navigation = useNavigation<NavigationProp>();
  const activeAudios = getActiveAudios();

  const handleAudioPress = (audioId: string) => {
    navigation.navigate('AudioPlayer', { audioId });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path 
              d="M19 12H5M12 19l-7-7 7-7" 
              stroke={theme.colors.text} 
              strokeWidth={2} 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.title}>Biblioteca de Áudios</Text>
      </View>

      {/* Lista de áudios */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      >
        {activeAudios.map((audio, index) => (
          <TouchableOpacity
            key={audio.id}
            style={[
              styles.audioCard,
              index % 2 === 0 ? styles.audioCardLeft : styles.audioCardRight
            ]}
            onPress={() => handleAudioPress(audio.id)}
          >
            {/* Ícone de áudio */}
            <View style={styles.iconContainer}>
              <Svg width={48} height={48} viewBox="0 0 48 48" fill="none">
                <Circle cx="24" cy="24" r="20" fill="rgba(255, 255, 255, 0.2)" />
                <Path 
                  d="M18 14v20l14-10L18 14z" 
                  fill="#FFFFFF" 
                  opacity={0.9}
                />
              </Svg>
            </View>

            {/* Ordem */}
            <View style={styles.orderBadge}>
              <Text style={styles.orderText}>{audio.order}</Text>
            </View>

            {/* Título */}
            <Text style={styles.audioTitle} numberOfLines={2}>
              {audio.title}
            </Text>

            {/* Descrição */}
            {audio.description && (
              <Text style={styles.audioDescription} numberOfLines={2}>
                {audio.description}
              </Text>
            )}
          </TouchableOpacity>
        ))}

        {/* Mensagem se não houver áudios */}
        {activeAudios.length === 0 && (
          <View style={styles.emptyState}>
            <Svg width={64} height={64} viewBox="0 0 64 64" fill="none">
              <Circle cx="32" cy="32" r="28" stroke={theme.colors.textLight} strokeWidth={2} opacity={0.3} />
              <Path 
                d="M32 20v24M44 32H20" 
                stroke={theme.colors.textLight} 
                strokeWidth={2} 
                strokeLinecap="round"
                opacity={0.3}
              />
            </Svg>
            <Text style={styles.emptyTitle}>Nenhum áudio disponível</Text>
            <Text style={styles.emptyDescription}>
              Novos áudios serão adicionados em breve
            </Text>
          </View>
        )}

        <View style={{ height: 40 }} />
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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    gap: 16,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text,
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  audioCard: {
    width: cardWidth,
    backgroundColor: 'rgba(74, 106, 124, 0.3)',
    borderRadius: 16,
    padding: 16,
    minHeight: 200,
    position: 'relative',
  },
  audioCardLeft: {
    marginRight: 8,
  },
  audioCardRight: {
    marginLeft: 8,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  orderBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  audioTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 8,
    textAlign: 'center',
    lineHeight: 20,
  },
  audioDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 16,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    width: '100%',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.textLight,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: theme.colors.textLight,
    textAlign: 'center',
    opacity: 0.7,
  },
});
