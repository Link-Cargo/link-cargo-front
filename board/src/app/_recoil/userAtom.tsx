import { atom } from 'recoil';

interface UserState {
  accessToken: string | null;
  refreshToken: string | null;
}

export const userAtom = atom<UserState>({
  key: 'userAtomState',
  default: {
    accessToken: null,
    refreshToken: null,
  },
});
