import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
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
      <div className="relative bg-gradient-to-br from-purple-200 to-blue-200 aspect-video flex items-center justify-center">
        <BookOpen className="w-16 h-16 text-purple-600" />
        {program.isDailyStorie && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-yellow-500">Storie Diário</Badge>
          </div>
        )}
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-bold text-lg line-clamp-2">{program.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {program.description || "Jornada de transformação pessoal"}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
          <span>{program.totalContentCount} aulas</span>
          <span>{Math.floor(program.totalDurationSeconds / 60)} min</span>
        </div>
      </div>
    </Card>
  );
}
