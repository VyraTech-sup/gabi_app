/**
 * Dados mock para desenvolvimento
 * Substituir por dados reais da API posteriormente
 */

import { Program, Episode, User, Notification, ProgramCategory } from '../types';

// Mock de usuário
export const mockUser: User = {
  id: '1',
  name: 'Maria Silva',
  email: 'maria@exemplo.com',
  avatar: 'https://i.pravatar.cc/150?img=1',
  isPremium: false,
  createdAt: '2025-01-01T00:00:00.000Z',
};

// Mock de programas
export const mockPrograms: Program[] = [
  {
    id: '1',
    title: 'Fé e Autocura',
    description: 'Comece seu dia com clareza mental e energia positiva através desta meditação guiada.',
    coverImage: 'https://picsum.photos/seed/med1/400/300',
    category: 'meditation',
    duration: 900,
    isPremium: false,
    audioSource: null,
    tags: ['manhã', 'energia', 'foco'],
    instructor: 'Dr. Paulo Mendes',
    episodeCount: 1,
  },
  {
    id: '2',
    title: 'Áudio para Insônia',
    description: 'Relaxe com sons calmantes e tenha uma noite de sono profundo e restaurador.',
    coverImage: 'https://picsum.photos/seed/sleep1/400/300',
    category: 'sleep',
    duration: 3600,
    isPremium: true,
    audioSource: null,
    tags: ['sono', 'relaxamento', 'natureza'],
    episodeCount: 8,
  },
  {
    id: '3',
    title: 'Respiração Consciente',
    description: 'Aprenda técnicas de respiração para reduzir ansiedade e melhorar seu bem-estar.',
    coverImage: 'https://picsum.photos/seed/breath1/400/300',
    category: 'breathing',
    duration: 600, // 10 min
    isPremium: false,
    audioUrl: '',
    tags: ['ansiedade', 'respiração', 'calma'],
    instructor: 'Ana Costa',
    episodeCount: 5,
  },
  {
    id: '4',
    title: 'Mindfulness no Trabalho',
    description: 'Práticas de atenção plena para aumentar produtividade e reduzir estresse no ambiente profissional.',
    coverImage: 'https://picsum.photos/seed/work1/400/300',
    category: 'mindfulness',
    duration: 1200, // 20 min
    isPremium: true,
    videoUrl: '',
    tags: ['trabalho', 'produtividade', 'mindfulness'],
    instructor: 'Dr. Carlos Ribeiro',
    episodeCount: 12,
  },
  {
    id: '5',
    title: 'Música Relaxante Instrumental',
    description: 'Composições suaves e harmoniosas para meditação, estudo ou relaxamento.',
    coverImage: 'https://picsum.photos/seed/music1/400/300',
    category: 'music',
    duration: 2400, // 40 min
    isPremium: false,
    audioUrl: '',
    tags: ['música', 'foco', 'relaxamento'],
    episodeCount: 15,
  },
  {
    id: '6',
    title: 'Histórias para Dormir',
    description: 'Narrativas tranquilas e envolventes que ajudam você a adormecer naturalmente.',
    coverImage: 'https://picsum.photos/seed/stories1/400/300',
    category: 'stories',
    duration: 1800, // 30 min
    isPremium: true,
    audioUrl: '',
    tags: ['sono', 'histórias', 'relaxamento'],
    instructor: 'Júlia Santos',
    episodeCount: 20,
  },
  {
    id: '7',
    title: 'Curso Completo de Meditação',
    description: 'Aprenda a meditar do zero com este curso estruturado de 30 dias.',
    coverImage: 'https://picsum.photos/seed/course1/400/300',
    category: 'courses',
    duration: 1500, // 25 min por aula
    isPremium: true,
    videoUrl: '',
    tags: ['curso', 'iniciante', 'fundamentos'],
    instructor: 'Mestre Fernando Lima',
    episodeCount: 30,
  },
  {
    id: '8',
    title: 'Meditação para Ansiedade',
    description: 'Técnicas específicas para acalmar a mente e reduzir sintomas de ansiedade.',
    coverImage: 'https://picsum.photos/seed/anxiety1/400/300',
    category: 'meditation',
    duration: 1080, // 18 min
    isPremium: false,
    audioUrl: '',
    tags: ['ansiedade', 'calma', 'saúde mental'],
    instructor: 'Dra. Beatriz Alves',
    episodeCount: 7,
  },
];

// Mock de episódios
export const mockEpisodes: Episode[] = [
  {
    id: 'ep1',
    programId: '2',
    title: 'Áudio para Insônia - Parte 1',
    description: 'Sons relaxantes para uma noite de sono profundo.',
    coverImage: 'https://picsum.photos/seed/rain1/400/300',
    duration: 3600,
    audioSource: null,
    episodeNumber: 1,
    isPremium: true,
  },
  {
    id: 'ep2',
    programId: '1',
    title: 'Fé e Autocura - Sessão Completa',
    description: 'Meditação guiada para autocura e fortalecimento da fé.',
    coverImage: 'https://picsum.photos/seed/ocean1/400/300',
    duration: 900,
   audioSource: null,
    episodeNumber: 2,
    isPremium: false,
  },
  {
    id: 'ep3',
    programId: '4',
    title: 'Introdução ao Mindfulness',
    description: 'Fundamentos da prática de atenção plena no ambiente de trabalho.',
    coverImage: 'https://picsum.photos/seed/intro1/400/300',
    duration: 1200,
    videoUrl: '',
    episodeNumber: 1,
    isPremium: true,
  },
];

// Mock de notificações
export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    title: 'Nova meditação disponível',
    message: 'Experimente a nova meditação "Energia Matinal"',
    type: 'info',
    read: false,
    createdAt: new Date().toISOString(),
    actionUrl: 'program/9',
  },
  {
    id: 'n2',
    title: 'Lembrete de prática',
    message: 'Que tal uma meditação de 10 minutos agora?',
    type: 'reminder',
    read: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'n3',
    title: 'Conquista desbloqueada! 🎉',
    message: 'Você completou 7 dias consecutivos de meditação',
    type: 'achievement',
    read: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

// Programas por categoria
export const getProgramsByCategory = (category: ProgramCategory): Program[] => {
  return mockPrograms.filter(program => program.category === category);
};

// Programas em destaque
export const getFeaturedPrograms = (): Program[] => {
  return mockPrograms.slice(0, 4);
};

// Programas gratuitos
export const getFreePrograms = (): Program[] => {
  return mockPrograms.filter(program => !program.isPremium);
};

// Programas premium
export const getPremiumPrograms = (): Program[] => {
  return mockPrograms.filter(program => program.isPremium);
};

// Episódios de um programa
export const getEpisodesByProgramId = (programId: string): Episode[] => {
  return mockEpisodes.filter(episode => episode.programId === programId);
};

// Categorias
export const categories: { id: ProgramCategory; name: string; icon: string; color: string }[] = [
  { id: 'meditation', name: 'Meditação', icon: '🧘', color: '#8B7355' },
  { id: 'mindfulness', name: 'Mindfulness', icon: '🌸', color: '#C9A885' },
  { id: 'sleep', name: 'Sono', icon: '🌙', color: '#7C9CB8' },
  { id: 'breathing', name: 'Respiração', icon: '💨', color: '#A8C9A0' },
  { id: 'music', name: 'Música', icon: '🎵', color: '#D4A373' },
  { id: 'stories', name: 'Histórias', icon: '📖', color: '#B8956A' },
  { id: 'courses', name: 'Cursos', icon: '🎓', color: '#8B7D6B' },
];
