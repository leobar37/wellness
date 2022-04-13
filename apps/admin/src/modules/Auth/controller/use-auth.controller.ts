import { useLoginMutation } from '@wellness/admin-ui';
import { isServer } from '@wellness/admin-ui/utils';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useJwt } from 'react-jwt';

const useManageToken = () => {
  const get = () => {
    return !isServer && localStorage.getItem('token');
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

export const useAuth = () => {
  const [loginMutation] = useLoginMutation();
  const router = useRouter();
  const tokenManager = useManageToken();

  useEffect(() => {
    if (!tokenManager.isValid) {
      router.push('/app');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email: string, password: string) => {
    const result = await loginMutation({
      variables: {
        input: {
          email,
          password,
        },
      },
    });
    const token = result.data.login.access_token;
    if (token) {
      tokenManager.set(result.data.login.access_token);
      router.push('/app');
    }
    return result.data.login;
  };

  return {
    login,
  };
};
