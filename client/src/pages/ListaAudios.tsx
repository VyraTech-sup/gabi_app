import { useState } from "react";
import { Button } from "@/components/ui/button";
import { playAudio, stopAudio, isAudioPlaying } from "@/lib/globalAudio";

// Exemplo de dados dos áudios
const audios = [
  { nome: "Elimine a Insônia", arquivo: "audio_insonia.opus" },
  { nome: "Vença a Ansiedade", arquivo: "vencer_a_ansiedade.opus" },
  { nome: "Vença o Medo de Errar", arquivo: "vencer_o_medo_de_errar.opus" },
  { nome: "Se Abra Para Mudanças", arquivo: "mentalidade_mudancas.mp3" },
  { nome: "Ative a Felicidade", arquivo: "AUTOHIPNOSE_FELICIDADEmix.mp3" },
  { nome: "Fortaleça a Autoconfiança", arquivo: "AUTOHIPNOSE_AUTOCONFIANCA.mp3" },
  { nome: "Ative Fé e Autocura", arquivo: "fe_autocura.opus" },
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
              onClick={async () => {
                // block re-creating audio; use global singleton
                const url = `/assets/${audio.arquivo}`;
                try {
                  await playAudio(url);
                  setAudioSelecionado(audio.arquivo);
                } catch (e) {
                  // ignore playback error
                }
              }}
              variant={audioSelecionado === audio.arquivo ? "default" : "outline"}
              disabled={isAudioPlaying() && audioSelecionado !== audio.arquivo}
            >
              {audioSelecionado === audio.arquivo ? "Selecionado" : "Ouvir"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
