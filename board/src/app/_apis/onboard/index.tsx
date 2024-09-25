import { postLogin, getReToken } from './postLogin';
import { postRegister } from './postRegister';
import { getUser } from './getUser';

import { PostILoginDto } from './postLogin';
import { PostIRegisterDto } from './postRegister';
import { GetIUserDto } from './getUser';

export const OnboardApiService = {
  postLogin,
  postRegister,
  getUser,
  getReToken,
};

export type { PostILoginDto, PostIRegisterDto, GetIUserDto };
