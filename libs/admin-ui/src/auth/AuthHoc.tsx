/* eslint-disable react-hooks/rules-of-hooks */
import { SafeAny } from '@wellness/common';
import { useRouter } from 'next/router';
import { ComponentType, useEffect } from 'react';
import { Role } from '../common';
import { useAuth } from './auth.service';
import { warn } from '@chakra-ui/utils';
import { useState, FC, useRef } from 'react';
import { useUpdateEffect } from '@chakra-ui/react';
import { isNil } from 'lodash';
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
    const { user, isLoggedIn, redirect, isLoggedInFn } = useAuth();
    const cacheRef = useRef<Map<string, SafeAny>>(new Map());
    const router = useRouter();
    useEffect(() => {
      const isLogged = !!isLoggedIn;

      cacheRef.current.set('intendRoute', isLogged);
      if (isLoggedInFn()) {
        const isAllow =
          roles.length === 0 || roles?.some((r) => user.rol === r);
        const route = cacheRef.current.get('intendRoute');
        setAllow(isAllow);
        if (!isAllow) {
          setAllow(false);
          redirect(redirectPath || '/');
        }
      } else {
        setAllow(false);
        redirect(redirectPath || '/');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, isLoggedIn]);

    if (isNil(allow)) {
      return null;
    }

    return allow ? <Component {...(props as SafeAny)} /> : (null as SafeAny);
  }) as SafeAny as T;
