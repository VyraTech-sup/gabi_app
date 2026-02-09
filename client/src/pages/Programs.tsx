import { useState } from 'react';
import { useLocation } from 'wouter';

interface Program {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  emoji: string;
}

const programs: Program[] = [
  {
    id: '1',
    title: 'Autocuidado e Feminino',
    description: 'Reconecte-se com sua essência feminina',
    duration: '15 min',
    category: 'Bem-estar',
    emoji: '🌸'
  },
  {
    id: '2',
    title: 'Conexão Interior',
    description: 'Encontre paz e equilíbrio interno',
    duration: '20 min',
    category: 'Meditação',
    emoji: '🧘‍♀️'
  },
  {
    id: '3',
    title: 'Relacionamento',
    description: 'Melhore seus relacionamentos',
    duration: '18 min',
    category: 'Relacionamentos',
    emoji: '💕'
  },
  {
    id: '4',
    title: 'Abundância Financeira',
    description: 'Reprograme sua mente para prosperidade',
    duration: '25 min',
    category: 'Prosperidade',
    emoji: '💰'
  },
  {
    id: '5',
    title: 'Sono Profundo',
    description: 'Durma melhor e acorde renovado',
    duration: '30 min',
    category: 'Sono',
    emoji: '😴'
  },
  {
    id: '6',
    title: 'Autoconfiança',
    description: 'Fortaleça sua autoestima',
    duration: '22 min',
    category: 'Desenvolvimento',
    emoji: '💪'
  }
];

export default function Programs() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [, setLocation] = useLocation();

  const categories = ['Todos', 'Bem-estar', 'Meditação', 'Relacionamentos', 'Prosperidade', 'Sono', 'Desenvolvimento'];

  const filteredPrograms = selectedCategory === 'Todos'
    ? programs
    : programs.filter(p => p.category === selectedCategory);

  const handleProgramClick = (programId: string) => {
    setLocation(`/player/${programId}`);
  };

  return (
    <div className="min-h-screen bg-[#3A5A6C]">
      {/* Header */}
      <header className="bg-[#2D4A57] px-8 py-6">
        <h1 className="text-2xl font-bold text-white">Programas</h1>
        <p className="text-white/70 mt-1">Escolha um áudio para começar</p>
      </header>

      {/* Categories */}
      <div className="px-8 py-6 overflow-x-auto">
        <div className="flex gap-3">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-white text-[#3A5A6C]'
                  : 'bg-[#2D4A57] text-white/70 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Programs Grid */}
      <div className="px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map(program => (
            <div
              key={program.id}
              onClick={() => handleProgramClick(program.id)}
              className="bg-[#2D4A57] rounded-2xl p-6 cursor-pointer hover:bg-[#3A5A6C] transition-colors"
            >
              <div className="text-5xl mb-4">{program.emoji}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {program.title}
              </h3>
              <p className="text-white/70 text-sm mb-4">
                {program.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-white/50 text-sm">{program.duration}</span>
                <span className="bg-[#3A5A6C] text-white/70 text-xs px-3 py-1 rounded-full">
                  {program.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
