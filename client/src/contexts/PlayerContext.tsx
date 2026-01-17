import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { PlayerState } from "@shared/types";

interface PlayerContextType extends PlayerState {
  setContentId: (id: number | null) => void;
  setIsPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setSpeed: (speed: number) => void;
  setIsLoading: (loading: boolean) => void;
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
  skipForward: () => void;
  skipBackward: () => void;
  changeSpeed: (speed: number) => void;
  reset: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

const DEFAULT_STATE: PlayerState = {
  contentId: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  speed: 1,
  isLoading: false,
};

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PlayerState>(DEFAULT_STATE);

  const setContentId = useCallback((id: number | null) => {
    setState((prev) => ({ ...prev, contentId: id, currentTime: 0 }));
  }, []);

  const setIsPlaying = useCallback((playing: boolean) => {
    setState((prev) => ({ ...prev, isPlaying: playing }));
  }, []);

  const setCurrentTime = useCallback((time: number) => {
    setState((prev) => ({ ...prev, currentTime: time }));
  }, []);

  const setDuration = useCallback((duration: number) => {
    setState((prev) => ({ ...prev, duration }));
  }, []);

  const setSpeed = useCallback((speed: number) => {
    setState((prev) => ({ ...prev, speed }));
  }, []);

  const setIsLoading = useCallback((loading: boolean) => {
    setState((prev) => ({ ...prev, isLoading: loading }));
  }, []);

  const play = useCallback(() => {
    setState((prev) => ({ ...prev, isPlaying: true }));
  }, []);

  const pause = useCallback(() => {
    setState((prev) => ({ ...prev, isPlaying: false }));
  }, []);

  const seek = useCallback((time: number) => {
    setState((prev) => ({ ...prev, currentTime: Math.max(0, Math.min(time, prev.duration)) }));
  }, []);

  const skipForward = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentTime: Math.min(prev.currentTime + 15, prev.duration),
    }));
  }, []);

  const skipBackward = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentTime: Math.max(prev.currentTime - 15, 0),
    }));
  }, []);

  const changeSpeed = useCallback((speed: number) => {
    setState((prev) => ({ ...prev, speed }));
  }, []);

  const reset = useCallback(() => {
    setState(DEFAULT_STATE);
  }, []);

  const value: PlayerContextType = {
    ...state,
    setContentId,
    setIsPlaying,
    setCurrentTime,
    setDuration,
    setSpeed,
    setIsLoading,
    play,
    pause,
    seek,
    skipForward,
    skipBackward,
    changeSpeed,
    reset,
  };

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}
