import { noop, pipe } from '@chakra-ui/utils';
import { SafeAny } from '@wellness/common';
import _create from 'zustand';
import { combine } from 'zustand/middleware';
import { immer } from '../../lib';
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
};

export const useDialogs = create(
  combine(initialState, (set) => ({
    patch: set,
  }))
);
