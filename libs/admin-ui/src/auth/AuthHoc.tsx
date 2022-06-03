/* eslint-disable react-hooks/rules-of-hooks */
import { SafeAny } from '@wellness/common';
import { isNil } from 'lodash';
import { ComponentType, useEffect, useState } from 'react';
import { Role } from '../common';
import { useAuth } from './auth.service';

export type AuthHocOptions = {
  roles?: Role[];
  refirect?: string;
};
export const WithAuth = <T extends ComponentType>(
  Component: T,
  options?: AuthHocOptions
): T =>
  (({ ...props }) => {
    const { roles = [], refirect: redirectPath } = options || {};
    const [allow, setAllow] = useState<null | boolean>(null);
    const { isLoggedIn, user, redirect, isLoggedInFn } = useAuth();

    useEffect(() => {
      if (!isLoggedInFn()) {
        setAllow(false);
        redirect(redirectPath || '/auth/login');
      }
      if (isLoggedInFn() && user) {
        const isAllow =
          roles.length === 0 || roles?.some((r) => user.rol === r);
        setAllow(isAllow);
        if (!isAllow) {
          setAllow(false);
          redirect(redirectPath || '/');
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, isLoggedIn]);

    if (isNil(allow)) {
      return null;
    }

    const Comp: SafeAny = Component;
    return allow ? <Comp {...(props as SafeAny)} /> : (null as SafeAny);
  }) as SafeAny as T;
