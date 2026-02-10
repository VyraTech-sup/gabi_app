/**
 * Biblioteca de Áudios - Configuração Dinâmica
 * 
 * Para adicionar novos áudios:
 * 1. Coloque o arquivo de áudio na pasta mobile/assets/
 * 2. Adicione uma nova entrada neste arquivo com:
 *    - id único
 *    - título
 *    - fileName (exatamente igual ao nome do arquivo)
 *    - ordem
 *    - ativo: true
 * 3. O áudio aparecerá automaticamente na biblioteca
 */

export interface AudioItem {
  id: string;
  title: string;
  fileName: string;
  order: number;
  active: boolean;
  description?: string;
}

/**
 * Lista oficial de áudios
 * Ordem definida pela especificação do produto
 */
export const AUDIO_LIBRARY: AudioItem[] = [
  {
    id: '1',
    title: 'Vença o Medo de Errar',
    fileName: 'venca_medo_errar.opus', // Arquivo ainda não existe
    order: 1,
    active: false, // Desativado até o arquivo existir
    description: 'Supere seus medos e liberte-se das amarras da insegurança'
  },
  {
    id: '2',
    title: 'Ative Fé e Autocura',
    fileName: 'ativefeeautocura.mp3.opus',
    order: 2,
    active: true,
    description: 'Fortaleça sua fé interior e ative o poder de autocura'
  },
  {
    id: '3',
    title: 'Elimine a Insônia',
    fileName: 'elimineainsonia.mp3.opus',
    order: 3,
    active: true,
    description: 'Relaxe profundamente e tenha uma noite de sono restaurador'
  },
  {
    id: '4',
    title: 'Vença a Ansiedade',
    fileName: 'venca_ansiedade.opus', // Arquivo ainda não existe
    order: 4,
    active: false, // Desativado até o arquivo existir
    description: 'Acalme sua mente e encontre paz interior'
  },
  {
    id: '5',
    title: 'Se Abra Para Mudanças',
    fileName: 'seabraparamudanças.mp3.mp4',
    order: 5,
    active: true,
    description: 'Libere-se de padrões antigos e abrace novas possibilidades'
  },
  {
    id: '6',
    title: 'Ative a Felicidade',
    fileName: 'ativeafelicidade.mp3.m4a',
    order: 6,
    active: true,
    description: 'Conecte-se com a alegria genuína e duradoura'
  },
  {
    id: '7',
    title: 'Fortaleça a Autoconfiança',
    fileName: 'fortaleçaaautoconfiança.mp3.wav',
    order: 7,
    active: true,
    description: 'Desenvolva confiança inabalável em si mesmo'
  },
  {
    id: '8',
    title: 'Acredite em Você',
    fileName: 'acredite_em_voce.opus', // Arquivo ainda não existe
    order: 8,
    active: false, // Desativado até o arquivo existir
    description: 'Desperte o poder que existe dentro de você'
  },
];

/**
 * Retorna apenas áudios ativos, ordenados
 */
export function getActiveAudios(): AudioItem[] {
  return AUDIO_LIBRARY
    .filter(audio => audio.active)
    .sort((a, b) => a.order - b.order);
}

/**
 * Busca um áudio pelo ID
 */
export function getAudioById(id: string): AudioItem | undefined {
  return AUDIO_LIBRARY.find(audio => audio.id === id);
}

/**
 * Retorna o caminho require() para o arquivo de áudio
 * Centraliza o mapeamento de arquivos
 */
export function getAudioSource(fileName: string): any {
  const audioSources: { [key: string]: any } = {
    'ativefeeautocura.mp3.opus': require('../assets/ativefeeautocura.mp3.opus'),
    'elimineainsonia.mp3.opus': require('../assets/elimineainsonia.mp3.opus'),
    'seabraparamudanças.mp3.mp4': require('../assets/seabraparamudanças.mp3.mp4'),
    'ativeafelicidade.mp3.m4a': require('../assets/ativeafelicidade.mp3.m4a'),
    'fortaleçaaautoconfiança.mp3.wav': require('../assets/fortaleçaaautoconfiança.mp3.wav'),
  };

  return audioSources[fileName] || null;
}

/**
 * Verifica se um arquivo de áudio existe
 */
export function audioFileExists(fileName: string): boolean {
  return getAudioSource(fileName) !== null;
}
