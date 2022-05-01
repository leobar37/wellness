import { createContext } from '@chakra-ui/react-utils';
import { FC, useEffect } from 'react';
import { useJwt, isExpired, decodeToken } from 'react-jwt';
import { useLoginMutation } from '../common';
import { Administrator } from '../common/generated-types';
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
  user: TokenUser;
  redirect: (path: string) => void;
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

  const logout = async () => {
    if (tokenManager.isValid) {
      tokenManager.remove();
    }
  };
  const redirect = (path: string) => {
    router.push(path);
  };

  const isAuthenticated = () => {
    const token = tokenManager.get();
    return !isExpired(token);
  };

  return (
    <Provider
      value={{
        login,
        isLoggedIn: tokenManager.isValid,
        user: tokenManager.decodedToken as TokenUser,
        logout,
        redirect,
        isLoggedInFn: isAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};

export const useAuth = () => useAuthContext();