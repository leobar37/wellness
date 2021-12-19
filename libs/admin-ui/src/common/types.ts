import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { SafeAny } from '@wellness/common';
// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P extends {} = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout<SafeAny>;
};

export type ModeAction = 'edit' | 'create' | 'view';
