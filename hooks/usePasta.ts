import { usePastaStore } from '../contexts/PastaContext';

export function usePasta() {
  return usePastaStore();
}

export function usePastaById(id: string) {
  const getPastaById = usePastaStore(state => state.getPastaById);
  return getPastaById(id);
}
