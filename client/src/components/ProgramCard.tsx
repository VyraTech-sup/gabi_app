import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";
import type { Program } from "@shared/types";

interface ProgramCardProps {
  program: Program;
  onClick?: () => void;
}

export function ProgramCard({ program, onClick }: ProgramCardProps) {
  return (
    <Card
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <div className="flex items-center p-4">
        <div className="w-20 h-20 rounded-full bg-slate-200 flex-shrink-0 overflow-hidden mr-4 flex items-center justify-center">
          {/* Placeholder image/icon */}
          <div className="text-slate-400">🎧</div>
        </div>

        <div className="flex-1">
          <div className="text-sm text-[#9CA3AF] mb-1">Reprogramação – {program.instructor || 'Gabriela Artz'}</div>
          <h3 className="font-semibold text-lg text-[#0B57C2] line-clamp-2">{program.title}</h3>
        </div>

        <div className="ml-4 flex items-center">
          <button className="flex items-center bg-[#F5EBDD] text-[#0B57C2] px-4 py-2 rounded-full shadow-sm">
            <Play className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Iniciar Reprogramação</span>
          </button>
        </div>
      </div>
    </Card>
  );
}
