import { getNoti } from './getNoti';
import { putNoti, putNotiAll } from './putNoti';

import { GetINotiDto } from './getNoti';
import { PutINotiDto } from './putNoti';

export const NotiApiService = { getNoti, putNoti, putNotiAll };

export type { GetINotiDto, PutINotiDto };
