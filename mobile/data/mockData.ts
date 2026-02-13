/**
 * Dados mock para desenvolvimento
 * Substituir por dados reais da API posteriormente
 */

import { Program, Episode, User, Notification, ProgramCategory, Review, ProgramRating } from '../types';

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
    title: 'Meditação de Fé e Autoconfiança',
    description: 'Comece seu dia com clareza mental e energia positiva através desta meditação guiada.',
    coverImage: 'https://picsum.photos/seed/med1/400/300',
    category: 'meditation',
    duration: 900,
    isPremium: false,
    audioSource: undefined,
    tags: ['manhã', 'energia', 'foco'],
    instructor: 'Gabriela Artz',
    episodeCount: 1,
  },
  {
    id: '2',
    title: 'Áudio para Insônia',
    description: 'Relaxe com sons calmantes e tenha uma noite de sono profundo e restaurador.',
    coverImage: 'https://picsum.photos/seed/sleep1/400/300',
    category: 'sleep',
    duration: 3600,
    isPremium: false,
    audioSource: undefined,
    tags: ['sono', 'relaxamento', 'natureza'],
    instructor: 'Gabriela Artz',
    episodeCount: 8,
  },
  {
    id: '3',
    title: 'Respiração Consciente',
    description: 'Aprenda técnicas de respiração para promover calma e melhorar seu bem-estar.',
    coverImage: 'https://picsum.photos/seed/breath1/400/300',
    category: 'breathing',
    duration: 600, // 10 min
    isPremium: false,
    audioUrl: '',
    tags: ['calma', 'respiração', 'relaxamento'],
    instructor: 'Gabriela Artz',
    episodeCount: 5,
  },
  {
    id: '4',
    title: 'Mindfulness no Trabalho',
    description: 'Práticas de atenção plena para aumentar produtividade e reduzir estresse no ambiente profissional.',
    coverImage: 'https://picsum.photos/seed/work1/400/300',
    category: 'mindfulness',
    duration: 1200, // 20 min
    isPremium: false,
    videoUrl: '',
    tags: ['trabalho', 'produtividade', 'mindfulness'],
    instructor: 'Gabriela Artz',
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
    instructor: 'Gabriela Artz',
    episodeCount: 15,
  },
  {
    id: '6',
    title: 'Histórias para Dormir',
    description: 'Narrativas tranquilas e envolventes que ajudam você a adormecer naturalmente.',
    coverImage: 'https://picsum.photos/seed/stories1/400/300',
    category: 'stories',
    duration: 1800, // 30 min
    isPremium: false,
    audioUrl: '',
    tags: ['sono', 'histórias', 'relaxamento'],
    instructor: 'Gabriela Artz',
    episodeCount: 20,
  },
  {
    id: '7',
    title: 'Curso Completo de Meditação',
    description: 'Aprenda a meditar do zero com este curso estruturado de 30 dias.',
    coverImage: 'https://picsum.photos/seed/course1/400/300',
    category: 'courses',
    duration: 1500, // 25 min por aula
    isPremium: false,
    videoUrl: '',
    tags: ['curso', 'iniciante', 'fundamentos'],
    instructor: 'Gabriela Artz',
    episodeCount: 30,
  },
  {
    id: '8',
    title: 'Meditação para Tranquilidade',
    description: 'Técnicas para acalmar a mente e promover equilíbrio emocional.',
    coverImage: 'https://picsum.photos/seed/anxiety1/400/300',
    category: 'meditation',
    duration: 1080, // 18 min
    isPremium: false,
    audioUrl: '',
    tags: ['tranquilidade', 'calma', 'bem-estar'],
    instructor: 'Gabriela Artz',
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
    audioSource: undefined,
    episodeNumber: 1,
    isPremium: false,
  },
  {
    id: 'ep2',
    programId: '1',
    title: 'Meditação de Fé e Autoconfiança - Sessão Completa',
    description: 'Meditação guiada para fortalecimento da fé e autoconfiança.',
    coverImage: 'https://picsum.photos/seed/ocean1/400/300',
    duration: 900,
    audioSource: undefined,
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

// Reviews/Comentários
export const mockReviews: Review[] = [
  {
    id: 'r1',
    programId: '1',
    userId: 'u1',
    userName: 'Carla Mendes',
    userAvatar: 'https://i.pravatar.cc/150?img=5',
    rating: 5,
    comment: 'Excelente meditação! Comecei a praticar faz 2 semanas e já sinto uma diferença enorme na minha disposição matinal.',
    experience: 'Me ajudou a começar o dia com mais clareza e foco. Recomendo muito!',
    createdAt: '2026-02-05T10:30:00.000Z',
    likes: 24,
  },
  {
    id: 'r2',
    programId: '1',
    userId: 'u2',
    userName: 'Roberto Silva',
    userAvatar: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    comment: 'Transformou completamente minha rotina matinal.',
    experience: 'Antes era difícil acordar, agora acordo com energia e motivação. A voz do instrutor é muito calma e agradável.',
    createdAt: '2026-02-03T14:20:00.000Z',
    likes: 18,
  },
  {
    id: 'r3',
    programId: '1',
    userId: 'u3',
    userName: 'Ana Paula Costa',
    userAvatar: 'https://i.pravatar.cc/150?img=9',
    rating: 4,
    comment: 'Muito bom, mas achei que poderia ser um pouco mais longo.',
    experience: 'A meditação é ótima, me sinto mais relaxada e focada. Só gostaria que tivesse uma versão de 20 minutos.',
    createdAt: '2026-02-01T08:15:00.000Z',
    likes: 12,
  },
  {
    id: 'r4',
    programId: '2',
    userId: 'u4',
    userName: 'Pedro Oliveira',
    userAvatar: 'https://i.pravatar.cc/150?img=15',
    rating: 5,
    comment: 'Melhor áudio para dormir que já usei!',
    experience: 'Tinha dificuldade para dormir. Esse áudio me ajuda a relaxar e adormecer mais facilmente todas as noites.',
    createdAt: '2026-02-07T22:45:00.000Z',
    likes: 34,
  },
  {
    id: 'r5',
    programId: '3',
    userId: 'u5',
    userName: 'Juliana Rocha',
    userAvatar: 'https://i.pravatar.cc/150?img=20',
    rating: 5,
    comment: 'Essencial para quem busca mais tranquilidade.',
    experience: 'As técnicas de respiração são simples mas muito eficazes. Uso todos os dias quando preciso me acalmar.',
    createdAt: '2026-02-06T16:30:00.000Z',
    likes: 29,
  },
];

// Ratings dos programas
export const mockProgramRatings: ProgramRating[] = [
  {
    programId: '1',
    averageRating: 4.7,
    totalReviews: 156,
    ratingDistribution: {
      5: 98,
      4: 42,
      3: 12,
      2: 3,
      1: 1,
    },
  },
  {
    programId: '2',
    averageRating: 4.9,
    totalReviews: 203,
    ratingDistribution: {
      5: 178,
      4: 20,
      3: 4,
      2: 1,
      1: 0,
    },
  },
  {
    programId: '3',
    averageRating: 4.6,
    totalReviews: 87,
    ratingDistribution: {
      5: 52,
      4: 28,
      3: 6,
      2: 1,
      1: 0,
    },
  },
];

// Funções auxiliares para reviews
export const getReviewsByProgramId = (programId: string): Review[] => {
  return mockReviews.filter(review => review.programId === programId);
};

export const getProgramRating = (programId: string): ProgramRating | undefined => {
  return mockProgramRatings.find(rating => rating.programId === programId);
};

// Músicas/Áudios para a aba Music
export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
  duration: number; // em segundos
  category: 'relaxamento' | 'foco' | 'sono' | 'energia' | 'meditacao';
  isPremium: boolean;
  audioSource?: number;
  plays: number;
}

export const mockMusicTracks: MusicTrack[] = [
  {
    id: 'm1',
    title: 'Ondas do Oceano',
    artist: 'Natureza Sounds',
    coverImage: 'https://picsum.photos/seed/ocean/400/400',
    duration: 1800, // 30 min
    category: 'relaxamento',
    isPremium: false,
    plays: 12400,
  },
  {
    id: 'm2',
    title: 'Piano Suave ao Entardecer',
    artist: 'Instrumental Lounge',
    coverImage: 'https://picsum.photos/seed/piano/400/400',
    duration: 2400, // 40 min
    category: 'foco',
    isPremium: true,
    plays: 8730,
  },
  {
    id: 'm3',
    title: 'Chuva na Floresta',
    artist: 'Ambient Nature',
    coverImage: 'https://picsum.photos/seed/rain/400/400',
    duration: 3600, // 60 min
    category: 'sono',
    isPremium: false,
    plays: 15600,
  },
  {
    id: 'm4',
    title: 'Batidas Binaurais - Foco Profundo',
    artist: 'Binaural Lab',
    coverImage: 'https://picsum.photos/seed/binaural/400/400',
    duration: 2700, // 45 min
    category: 'foco',
    isPremium: true,
    plays: 9240,
  },
  {
    id: 'm5',
    title: 'Tibetan Singing Bowls',
    artist: 'Meditation Masters',
    coverImage: 'https://picsum.photos/seed/tibetan/400/400',
    duration: 1500, // 25 min
    category: 'meditacao',
    isPremium: true,
    plays: 7890,
  },
  {
    id: 'm6',
    title: 'Amanhecer Energizante',
    artist: 'Morning Vibes',
    coverImage: 'https://picsum.photos/seed/sunrise/400/400',
    duration: 900, // 15 min
    category: 'energia',
    isPremium: false,
    plays: 11230,
  },
  {
    id: 'm7',
    title: 'Violão Acústico Relaxante',
    artist: 'Acoustic Dreams',
    coverImage: 'https://picsum.photos/seed/guitar/400/400',
    duration: 2100, // 35 min
    category: 'relaxamento',
    isPremium: false,
    plays: 10450,
  },
  {
    id: 'm8',
    title: 'Deep Sleep Frequencies',
    artist: 'Sleep Science',
    coverImage: 'https://picsum.photos/seed/sleep/400/400',
    duration: 4800, // 80 min
    category: 'sono',
    isPremium: true,
    plays: 18900,
  },
  {
    id: 'm9',
    title: 'Flauta Nativa Americana',
    artist: 'Native Spirit',
    coverImage: 'https://picsum.photos/seed/flute/400/400',
    duration: 1800, // 30 min
    category: 'meditacao',
    isPremium: true,
    plays: 6540,
  },
  {
    id: 'm10',
    title: 'Lo-Fi Beats para Estudar',
    artist: 'Study Beats',
    coverImage: 'https://picsum.photos/seed/lofi/400/400',
    duration: 3000, // 50 min
    category: 'foco',
    isPremium: false,
    plays: 21340,
  },
];

export const getMusicByCategory = (category: MusicTrack['category']): MusicTrack[] => {
  return mockMusicTracks.filter(track => track.category === category);
};

export const getPopularMusic = (): MusicTrack[] => {
  return [...mockMusicTracks].sort((a, b) => b.plays - a.plays).slice(0, 5);
};


