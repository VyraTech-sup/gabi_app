import { useState } from "react";
import { Button } from "@/components/ui/button";

// Exemplo de dados dos áudios
const audios = [
  { nome: "Reprogramação do Sono", arquivo: "audio_insonia.opus" },
  { nome: "Autoestima e Autocura", arquivo: "fe_autocura.opus" },
  // Adicione mais áudios conforme necessário
];

export default function ListaAudios() {
  const [audioSelecionado, setAudioSelecionado] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#3A5A6C] flex flex-col items-center py-10">
      <h1 className="text-2xl font-bold text-white mb-6">Áudios de Reprogramação</h1>
      <div className="w-full max-w-md space-y-4">
        {audios.map((audio) => (
          <div
            key={audio.arquivo}
            className={`rounded-xl p-4 flex items-center justify-between bg-white/80 shadow transition-all ${audioSelecionado === audio.arquivo ? "ring-2 ring-[#3A5A6C]" : ""}`}
          >
            <span className="text-[#3A5A6C] font-medium">{audio.nome}</span>
            <Button
              onClick={() => setAudioSelecionado(audio.arquivo)}
              variant={audioSelecionado === audio.arquivo ? "default" : "outline"}
            >
              {audioSelecionado === audio.arquivo ? "Selecionado" : "Ouvir"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
