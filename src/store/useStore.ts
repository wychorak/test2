import { create } from 'zustand';

interface AppState {
  sakuraStorm: boolean;
  triggerSakuraStorm: () => void;
  ambientSound: boolean;
  toggleAmbientSound: () => void;
  hoveringInteractive: boolean;
  setHoveringInteractive: (hovering: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  sakuraStorm: false,
  triggerSakuraStorm: () => set({ sakuraStorm: true }),
  ambientSound: false,
  toggleAmbientSound: () => set((state) => ({ ambientSound: !state.ambientSound })),
  hoveringInteractive: false,
  setHoveringInteractive: (hovering) => set({ hoveringInteractive: hovering }),
}));
