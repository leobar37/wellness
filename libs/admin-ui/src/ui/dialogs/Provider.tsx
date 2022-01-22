import { ConfirmModal } from './Confirm';
import { ShowNoticeModal } from './Notice';
import { FC, Fragment } from 'react';
export const DialogsProvider: FC = ({ children }) => {
  return (
    <Fragment>
      {children}
      <ConfirmModal />
      <ShowNoticeModal />
    </Fragment>
  );
};
