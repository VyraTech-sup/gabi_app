// Global audio player state management
let currentAudio: HTMLAudioElement | null = null;
let currentAudioId: string | null = null;

export function playAudio(audioUrl: string, audioId: string): void {
  // Stop current audio if playing
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  // Create and play new audio
  currentAudio = new Audio(audioUrl);
  currentAudioId = audioId;
  
  currentAudio.play().catch((error) => {
    console.error('Error playing audio:', error);
  });

  // Clean up when audio ends
  currentAudio.addEventListener('ended', () => {
    currentAudio = null;
    currentAudioId = null;
  });
}

export function stopAudio(): void {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
    currentAudioId = null;
  }
}

export function isAudioPlaying(audioId: string): boolean {
  return currentAudioId === audioId && currentAudio !== null && !currentAudio.paused;
}

export function getCurrentAudioId(): string | null {
  return currentAudioId;
}
