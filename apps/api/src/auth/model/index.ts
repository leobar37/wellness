export * from './TokenObject';
import { Administrator } from '@wellness/core';
export * from './TokenObject';
export type TokenPayload = Omit<
  Administrator,
  'password' | 'updateAt' | 'createdAt'
>;
