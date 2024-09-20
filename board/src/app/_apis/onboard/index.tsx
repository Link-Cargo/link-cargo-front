import { postLogin } from './postLogin';
import { postRegister } from './postRegister';

import { PostILoginDto } from './postLogin';
import { PostIRegisterDto } from './postRegister';

export const OnboardApiService = { postLogin, postRegister };

export type { PostILoginDto, PostIRegisterDto };
