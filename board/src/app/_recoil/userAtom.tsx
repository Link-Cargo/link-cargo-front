import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

interface UserState {
  accessToken: string;
  refreshToken: string;
}

export const userAtom = atom<UserState>({
  key: 'userAtomState',
  default: {
    accessToken: '',
    refreshToken: '',
  },
  effects_UNSTABLE: [persistAtom],
});
