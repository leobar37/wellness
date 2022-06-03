import { createContext } from '@chakra-ui/react-utils';
import { FC, useEffect } from 'react';
import { useJwt, isExpired } from 'react-jwt';
import { useLoginMutation } from '../common';
import {
  Administrator,
  useGetAdministratorQuery,
} from '../common/generated-types';
import { isServer } from '../utils';
import { useRouter } from 'next/router';

export type TokenUser = Pick<
  Administrator,
  'dni' | 'email' | 'lastName' | 'name' | 'rol' | 'id'
>;

type AuthType = {
  login: (username: string, password: string) => Promise<string | undefined>;
  logout: () => Promise<void>;
  isLoggedIn: boolean;
  isLoggedInFn: () => boolean;
  currentUser: () => Administrator | null;
  redirect: (path: string) => void;
  user: Administrator | null;
};

const [Provider, useAuthContext] = createContext<AuthType>({
  name: 'AuthProvider',
  strict: true,
});

const useManageToken = () => {
  const get = () => {
    return (!isServer && localStorage.getItem('token')) || '';
  };

  const { reEvaluateToken, isExpired, decodedToken } = useJwt(get());

  useEffect(() => {
    reEvaluateToken(get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isValid = !!decodedToken && !isExpired;

  const set = (token: string) => {
    localStorage.setItem('token', token);
    reEvaluateToken(token);
  };

  const remove = () => {
    localStorage.removeItem('token');
    reEvaluateToken('');
  };

  return { set, remove, get, isExpired, decodedToken, isValid };
};

export const AuthProvider: FC = ({ children }) => {
  const [loginMutation] = useLoginMutation();
  const tokenManager = useManageToken();
  const router = useRouter();

  const isAuthenticated = () => {
    const token = tokenManager.get();
    return !isExpired(token);
  };

  const {
    data: userQuery,
    loading,
    error,
  } = useGetAdministratorQuery({
    variables: {
      id: (tokenManager.decodedToken as TokenUser)?.id,
    },
    skip: !isAuthenticated(),
  });

  const login = async (email: string, password: string) => {
    const result = await loginMutation({
      variables: {
        input: {
          email,
          password,
        },
      },
    });
    const token = result.data?.login.access_token;
    if (token) {
      tokenManager.set(token);
    }
    return token;
  };

  useEffect(() => {
    if (error) {
      tokenManager.remove();
      router.push('/auth/login');
    }
  }, [error, router, tokenManager]);

  const logout = async () => {
    if (tokenManager.isValid) {
      tokenManager.remove();
    }
  };
  const redirect = (path: string) => {
    router.push(path);
  };

  const currentUser = (): Administrator | null => {
    if (userQuery?.getAdministrator) {
      return userQuery.getAdministrator as Administrator;
    }
    return null;
  };

  return (
    <Provider
      value={{
        login,
        isLoggedIn: tokenManager.isValid,
        currentUser: currentUser,
        logout,
        redirect,
        user: currentUser(),
        isLoggedInFn: isAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};

export const useAuth = () => useAuthContext();
