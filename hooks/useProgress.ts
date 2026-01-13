import { useEffect } from 'react';
import { useProgressStore } from '../contexts/ProgressContext';

export function useProgress() {
  const store = useProgressStore();

  useEffect(() => {
    if (!store.isLoaded) {
      store.loadProgress();
    }
  }, [store.isLoaded]);

  return store;
}

export function useIsCompleted(pastaId: string) {
  return useProgressStore(state => state.completedPastas.includes(pastaId));
}

export function useStats() {
  return useProgressStore(state => state.stats);
}

export function useAchievements() {
  return useProgressStore(state => state.achievements);
}
