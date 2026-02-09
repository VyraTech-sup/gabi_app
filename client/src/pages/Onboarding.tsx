import { useState } from 'react';
import { useLocation } from 'wouter';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [, setLocation] = useLocation();

  const slides = [
    {
      title: "Bem-vindo ao All Mind",
      description: "Transforme sua mente com áudios de reprogramação mental",
      emoji: "🧠"
    },
    {
      title: "Áudios Personalizados",
      description: "Escolha entre diversos programas para diferentes áreas da sua vida",
      emoji: "🎧"
    },
    {
      title: "Resultados Comprovados",
      description: "Milhares de pessoas já transformaram suas vidas com All Mind",
      emoji: "✨"
    },
    {
      title: "Comece Agora",
      description: "7 dias grátis para você experimentar",
      emoji: "🚀"
    }
  ];

  const currentSlide = slides[step - 1];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setLocation('/programs');
    }
  };

  const handleSkip = () => {
    setLocation('/programs');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#3A5A6C] to-[#2D4A57] flex flex-col items-center justify-center p-8">
      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="absolute top-8 right-8 text-white/70 hover:text-white text-sm"
      >
        Pular
      </button>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md">
        <div className="text-8xl mb-8">{currentSlide.emoji}</div>
        <h1 className="text-3xl font-bold text-white mb-4">
          {currentSlide.title}
        </h1>
        <p className="text-lg text-white/80 mb-12">
          {currentSlide.description}
        </p>
      </div>

      {/* Dots indicator */}
      <div className="flex gap-2 mb-8">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all ${
              index + 1 === step
                ? 'w-8 bg-white'
                : 'w-2 bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Next button */}
      <button
        onClick={handleNext}
        className="w-full max-w-md bg-white text-[#3A5A6C] py-4 rounded-full font-semibold text-lg hover:bg-white/90 transition-colors"
      >
        {step < 4 ? 'Continuar' : 'Começar'}
      </button>
    </div>
  );
}
