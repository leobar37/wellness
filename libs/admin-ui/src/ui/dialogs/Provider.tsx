import { ConfirmModal } from './Confirm';
import { FC, Fragment } from 'react';
export const DialogsProvider: FC = ({ children }) => {
  return (
    <Fragment>
      {children}
      <ConfirmModal />
    </Fragment>
  );
};
