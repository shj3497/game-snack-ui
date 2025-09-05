import {create} from 'zustand';

type GameType = 'miniGame' | 'randomGame';

type AlertStore = {
  open: boolean;
  message: string;
  gameType: GameType;
  onOpen: (message: string, gameType?: GameType) => void;
  onClose: () => void;
  reset: () => void;
};

const useAlert = create<AlertStore>((set) => ({
  open: false,
  message: '',
  gameType: 'miniGame',
  onOpen: (message, gameType = 'miniGame') =>
    set({
      open: true,
      message,
      gameType,
    }),
  onClose: () => {
    set({
      open: false,
    });
    setTimeout(() => {
      set({
        open: false,
        message: '',
        gameType: 'miniGame',
      });
    }, 500);
  },
  reset: () => set({open: false, message: '', gameType: 'miniGame'}),
}));

export default useAlert;
