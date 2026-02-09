import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Bell, User, Lock } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useState } from "react";

/**
 * Home All Mind - Story-First Experience
 * Layout focado em jornada emocional diária através de Stories
 */
export default function Home() {
  const { user, isAuthenticated, logout } = useAuth();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const needsPhone = Boolean(isAuthenticated && (!user?.phone || !user?.isActive));

  const handleStartOAuth = () => {
    window.location.href = getLoginUrl();
  };

  const handleSubmitPhone = async () => {
    if (!phone) return;
    setLoading(true);
    try {
      const payload = { name: user?.name ?? null, email: user?.email ?? null, phone, provider: 'google' };
      const res = await fetch('/api/web-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to register');
      // reload to pick up session and updated user
      window.location.href = '/audios';
    } catch (err) {
      console.error(err);
      alert('Falha ao salvar telefone. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#3A5A6C]">
      {/* If user not authenticated show login gate */}
      {!isAuthenticated && (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundImage: 'url(/assets/onboarding/allmind-tela1.png)', backgroundSize: 'cover' }}>
          <div className="w-full max-w-xl px-8">
            <button onClick={handleStartOAuth} className="w-full bg-white rounded-full py-4 flex items-center justify-center gap-3 shadow-md">
              <img src="https://www.gstatic.com/images/branding/product/1x/googleg_32dp.png" alt="Google" className="w-6 h-6" />
              <span className="text-[#3A5A6C] font-bold text-lg">Entrar com Google</span>
            </button>
          </div>
        </div>
      )}

      {/* If authenticated but missing phone, show mini-signup */}
      {needsPhone && (
        <div className="min-h-screen flex items-center justify-center bg-[#3A5A6C]">
          <div className="w-full max-w-md bg-white rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-[#2D4A57] mb-2">Complete seu cadastro</h2>
            <p className="text-sm text-[#6B7E86] mb-6">Preencha seu telefone para acessar o aplicativo</p>
            <label className="block text-sm text-gray-700">Nome</label>
            <input className="w-full p-3 rounded-md mb-3 border" defaultValue={user?.name ?? ''} />
            <label className="block text-sm text-gray-700">E-mail</label>
            <input className="w-full p-3 rounded-md mb-3 border bg-gray-100" value={user?.email ?? ''} readOnly />
            <label className="block text-sm text-gray-700">Telefone</label>
            <input className="w-full p-3 rounded-md mb-4 border" value={phone} onChange={e => setPhone(e.target.value)} placeholder="(00) 00000-0000" />
            <button className="w-full bg-[#3A5A6C] text-white py-3 rounded-md" onClick={handleSubmitPhone} disabled={loading || !phone}>
              {loading ? 'Salvando...' : 'Acessar aplicativo'}
            </button>
          </div>
        </div>
      )}
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
          <Lock className="w-5 h-5 text-white" />
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
