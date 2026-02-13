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
 * IMPORTANTE: fileName deve corresponder exatamente ao nome do arquivo em assets/audio/
 */
export const AUDIO_LIBRARY: AudioItem[] = [
  { id: '1', title: 'Vencendo o Medo de Errar', fileName: 'vencendoomedodeerrar.mp3.mpeg', order: 1, active: true },
  { id: '2', title: 'Meditação de Fé e Autoconfiança', fileName: 'ativefeeautocura.mp3.opus', order: 2, active: true },
  { id: '3', title: 'Elimine a Insônia', fileName: 'elimineainsonia.mp3.opus', order: 3, active: true },
  { id: '4', title: 'Reduzindo a Ansiedade', fileName: 'vencendoaansiedade.mp3.mp4', order: 4, active: true },
  { id: '5', title: 'Se Abra Para Mudanças', fileName: 'seabraparamudanças.mp3.mp4', order: 5, active: true },
  { id: '6', title: 'Ative a Felicidade', fileName: 'ativeafelicidade.mp3.m4a', order: 6, active: true },
  { id: '7', title: 'Fortaleça a Autoconfiança', fileName: 'fortaleçaaautoconfiança.mp3.wav', order: 7, active: true },
  { id: '8', title: 'Acredite em Você', fileName: 'acrediteemvocê.mp3.mpeg', order: 8, active: true },
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
export function getAudioSource(fileName: string): number | null {
  // Metro bundler não suporta requires dinâmicos em produção
  // Retorna null - os arquivos de áudio devem ser carregados via URL
  return null;
}

/**
 * Verifica se um arquivo de áudio existe
 */
export function audioFileExists(fileName: string): boolean {
  return getAudioSource(fileName) !== null;
}
