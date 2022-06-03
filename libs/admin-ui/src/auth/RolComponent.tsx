import { FC } from 'react';
import { Role } from '../common';
import { useAuth } from './auth.service';
export type ShowByRolProps = {
  roles?: Role[];
};
export const ShowByRol: FC<ShowByRolProps> = ({ roles, children }) => {
  const { user, isLoggedIn } = useAuth();
  if (!user || !isLoggedIn) {
    return null;
  }
  const userHaveRol = roles?.some((r) => user.rol === r);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return userHaveRol ? <>{children}</> : null;
};

ShowByRol.defaultProps = {
  roles: [],
};
