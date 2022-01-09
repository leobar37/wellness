import { SafeAny } from '@wellness/common';
import { useCallback } from 'react';
import { FunctionOrPromise } from './types';
import { useDialogs, initialState } from './use-dialog-store';
type OnConfirmParams = {
  onConfirm?: FunctionOrPromise;
  onClose?: FunctionOrPromise;
  title?: string;
  description?: string;
};
export const useModalConfirm = () => {
  const { patch } = useDialogs();

  const confirm = useCallback(
    ({ onConfirm, onClose, title, description }: OnConfirmParams) => {
      const _onConfirm = async () => {
        await (onConfirm as SafeAny)?.();
        patch((state) => {
          state.confirmModal.isOpen = false;
        });
      };
      const _onClose = async () => {
        await (onClose as SafeAny)?.();
        patch((state) => {
          state.confirmModal.isOpen = false;
        });
      };
      patch((state) => {
        state.confirmModal = {
          onConfirm: _onConfirm,
          onClose: _onClose,
          isOpen: true,
          info: {
            title: title || initialState.confirmModal.info.title,
            description:
              description || initialState.confirmModal.info.description,
          },
        };
      });
    },
    [patch]
  );

  return confirm;
};
