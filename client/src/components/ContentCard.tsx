import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Lock } from "lucide-react";
import type { ContentWithProgress } from "@shared/types";

interface ContentCardProps {
  content: ContentWithProgress;
  onClick?: () => void;
  showProgress?: boolean;
}

export function ContentCard({ content, onClick, showProgress = true }: ContentCardProps) {
  const minutes = Math.floor(content.durationSeconds / 60);
  const seconds = content.durationSeconds % 60;
  const durationText = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  const progressPercentage = content.progress
    ? (content.progress.currentTime / content.durationSeconds) * 100
    : 0;

  return (
    <Card
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <div className="relative bg-gradient-to-br from-slate-200 to-slate-300 aspect-square flex items-center justify-center">
        <Play className="w-12 h-12 text-slate-600" />
        {content.isPremium && (
          <div className="absolute top-2 right-2">
            <Lock className="w-4 h-4 text-yellow-600" />
          </div>
        )}
      </div>

      <div className="p-3 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm line-clamp-2 flex-1">{content.title}</h3>
          <Badge variant="outline" className="text-xs whitespace-nowrap">
            {content.mediaType === "AUDIO" ? "Áudio" : "Vídeo"}
          </Badge>
        </div>

        <p className="text-xs text-muted-foreground">{durationText}</p>

        {showProgress && content.progress && (
          <div className="space-y-1">
            <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            {content.progress.isCompleted && (
              <p className="text-xs text-green-600 font-medium">✓ Concluído</p>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
