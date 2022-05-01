import { Role } from '@wellness/common';
import { ReactNode } from 'react';
export const config = {
  width: 280,
};

export type Item = {
  name: string;
  path?: string;
  subItems?: Item[];
  icon?: ReactNode;
  rol?: Role[];
};
