import { noop, pipe } from '@chakra-ui/utils';
import _create from 'zustand';
import { SafeAny } from '@wellness/common';
import produce from 'immer';
import { DraftFunction } from 'use-immer';
import { combine } from 'zustand/middleware';
import { immer } from '../../lib/zuztand/Immer';
import { FunctionOrPromise } from './types';
const create = pipe(immer as SafeAny, _create) as typeof _create;

export const initialState = {
  confirmModal: {
    isOpen: false,
    onConfirm: noop as FunctionOrPromise,
    onClose: noop as FunctionOrPromise,
    info: {
      title: '¿Esta seguro que desea realizar esta acción?',
      description: 'Esta acción no puede revertirse',
    } as { title: string; description: string },
  },
  noticeModal: {
    isOpen: false,
    notice: {
      onClose: noop,
      title: '' as string,
      description: '' as string,
    },
  },
  errorsModal: {
    isOpen: false,
    info: {
      title: '',
      description: '',
      onClose: noop,
    },
  },
};

type State = typeof initialState;

export const useDialogs = create(
  combine(initialState, (set, get) => ({
    patch: set,
    setErrorState: (info: DraftFunction<State['errorsModal']>) => {
      const state = get().errorsModal;
      const newState = produce(state, (draft) => {
        draft.info.onClose = () => {
          set((prev) => {
            return produce(prev, (dr) => {
              dr.errorsModal.isOpen = false;
            });
          });
        };
        Object.assign(draft, info(draft));
      });
      set({
        errorsModal: newState,
      });
    },
  }))
);
