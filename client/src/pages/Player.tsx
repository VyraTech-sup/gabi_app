import { useState, useRef, useEffect } from 'react';
import { useRoute, useLocation } from 'wouter';

export default function Player() {
  const [match, params] = useRoute('/player/:id');
  const [, setLocation] = useLocation();
  const id = params?.id;
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Mock data - em produção viria de uma API
  const program = {
    id,
    title: 'Autocuidado e Feminino',
    description: 'Reconecte-se com sua essência feminina',
    audioUrl: '/assets/audio_sample.mp3', // Placeholder
    emoji: '🌸'
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setLocation('/programs');
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [navigate]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#3A5A6C] to-[#2D4A57] flex flex-col items-center justify-center p-8">
      <audio ref={audioRef} src={program.audioUrl} />

      {/* Back button */}
      <button
        onClick={() => navigate('/programs')}
        className="absolute top-8 left-8 text-white/70 hover:text-white"
      >
        ← Voltar
      </button>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md w-full">
        <div className="text-8xl mb-8">{program.emoji}</div>
        <h1 className="text-3xl font-bold text-white mb-4">
          {program.title}
        </h1>
        <p className="text-lg text-white/80 mb-12">
          {program.description}
        </p>

        {/* Progress bar */}
        <div className="w-full mb-4">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, white ${(currentTime / duration) * 100}%, rgba(255,255,255,0.2) ${(currentTime / duration) * 100}%)`
            }}
          />
          <div className="flex justify-between text-white/70 text-sm mt-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Play/Pause button */}
        <button
          onClick={togglePlay}
          className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:bg-white/90 transition-colors mb-8"
        >
          {isPlaying ? (
            <svg className="w-8 h-8 text-[#3A5A6C]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 4h2v12H6V4zm6 0h2v12h-2V4z" />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-[#3A5A6C] ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 4l10 6-10 6V4z" />
            </svg>
          )}
        </button>

        {/* Instructions */}
        <div className="bg-white/10 rounded-2xl p-6 w-full">
          <p className="text-white/90 text-sm">
            💡 <strong>Dica:</strong> Use fones de ouvido para uma melhor experiência
          </p>
        </div>
      </div>
    </div>
  );
}
