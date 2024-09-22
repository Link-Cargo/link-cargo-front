import { getNoti } from './getNoti';
import { putNoti, putNotiAll } from './putNoti';
import { deleteNotiAll } from './deleteNotiAll';

import { GetINotiDto } from './getNoti';
import { PutINotiDto } from './putNoti';
import { DeleteINotiDto } from './deleteNotiAll';

export const NotiApiService = { getNoti, putNoti, putNotiAll, deleteNotiAll };

export type { GetINotiDto, PutINotiDto, DeleteINotiDto };
