import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Bell, User } from "lucide-react";

/**
 * Home All Mind - Story-First Experience
 * Layout focado em jornada emocional diária através de Stories
 */
export default function Home() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#3A5A6C]">
      {/* Header */}
      <header className="px-8 pt-12 pb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold text-white">
              Olá, {user?.name || 'Maria'}
            </h1>
            <p className="text-[#A0B5C0] mt-1">
              Como você está se sentindo hoje?
            </p>
          </div>
          
          <div className="flex gap-3">
            <button className="w-11 h-11 rounded-full bg-[#2D4A57] flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </button>
            <button className="w-11 h-11 rounded-full bg-[#2D4A57] flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Banner Trial Expirado */}
      {!isAuthenticated && (
        <div className="mx-8 mb-6 bg-[#F39C12] rounded-2xl px-6 py-4 flex items-center justify-center gap-2">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span className="text-white font-semibold text-sm">
            Sua avaliação gratuita expirou
          </span>
        </div>
      )}

      {/* Story do Dia - Card Principal */}
      <div className="mx-8 mb-8">
        <div 
          className="relative h-[500px] rounded-3xl overflow-hidden"
          style={{
            backgroundImage: 'url(https://picsum.photos/seed/story1/600/800)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Overlay escuro */}
          <div className="absolute inset-0 bg-black/30" />
          
          {/* Badge Story */}
          {!isAuthenticated && (
            <div className="absolute top-6 right-6 bg-[#3A5A6C] px-4 py-2 rounded-full">
              <span className="text-white text-sm font-semibold">Story 1</span>
            </div>
          )}
          
          {/* Conteúdo */}
          <div className="absolute inset-0 flex flex-col items-center justify-end p-8">
            <h2 className="text-5xl font-bold text-white text-center mb-4">
              Relacionamento com seu Ciclo
            </h2>
            
            <div className="bg-white/20 px-6 py-2 rounded-full mb-8">
              <span className="text-white font-medium">Pri Elias</span>
            </div>
            
            <Button 
              className="bg-[#3A5A6C] hover:bg-[#2D4A57] text-white px-8 py-6 text-lg min-w-[200px]"
            >
              Assistir Story
            </Button>
          </div>
        </div>
      </div>

      {/* Stories Assistidos */}
      <div className="mx-8 mb-8">
        <h3 className="text-2xl font-semibold text-white mb-6">
          Stories Assistidos
        </h3>
        
        <div className="space-y-4">
          {/* Story 1 */}
          <div className="bg-[#2D4A57] rounded-2xl p-4 flex items-center gap-4">
            <div 
              className="w-15 h-15 rounded-full flex-shrink-0"
              style={{
                backgroundImage: 'url(https://picsum.photos/seed/story2/200/200)',
                backgroundSize: 'cover'
              }}
            />
            <div className="flex-1">
              <h4 className="text-white font-semibold">Autocuidado e Feminino</h4>
              <p className="text-[#A0B5C0] text-sm">Ana Costa</p>
            </div>
            <button className="text-[#3A5A6C] text-sm font-medium px-4 py-2">
              Assistir novamente
            </button>
          </div>

          {/* Story 2 */}
          <div className="bg-[#2D4A57] rounded-2xl p-4 flex items-center gap-4">
            <div 
              className="w-15 h-15 rounded-full flex-shrink-0"
              style={{
                backgroundImage: 'url(https://picsum.photos/seed/story3/200/200)',
                backgroundSize: 'cover'
              }}
            />
            <div className="flex-1">
              <h4 className="text-white font-semibold">Conexão Interior</h4>
              <p className="text-[#A0B5C0] text-sm">Mariana Silva</p>
            </div>
            <button className="text-[#3A5A6C] text-sm font-medium px-4 py-2">
              Assistir novamente
            </button>
          </div>
        </div>
      </div>

      {/* Card de Conversão */}
      {!isAuthenticated && (
        <div className="mx-8 mb-12 bg-[#D4B5A8] rounded-3xl p-8 shadow-lg">
          <h3 className="text-2xl font-semibold text-[#2D4A57] text-center mb-6">
            Desbloqueie sua jornada completa em All Mind
          </h3>
          <Button 
            className="w-full bg-[#3A5A6C] hover:bg-[#2D4A57] text-white py-6 text-lg"
          >
            Assinar →
          </Button>
        </div>
      )}
    </div>
  );
}
