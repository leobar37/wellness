import { immer } from '@wellness/admin-ui/lib/zuztand';
import _create from 'zustand';
import { combine } from 'zustand/middleware';
import { pipe } from '@wellness/admin-ui/utils';
import { ModeAction, Administrator } from '@wellness/admin-ui';
import { Updater } from 'use-immer';

const create = pipe(immer, _create) as typeof _create;

const initialState = {
  administratorModal: {
    isOpen: false,
    mode: 'edit' as ModeAction,
    temporal: null as Administrator,
  },
};

export type AdministratorState = typeof initialState;

export const useAdministratorStore = create(
  combine(initialState, (set) => ({
    patch: set as Updater<AdministratorState>,
  }))
);

export const useAdministratorCrud = () => {
  const { patch, administratorModal } = useAdministratorStore();

  const openModal = (clean?: boolean) => {
    patch(({ administratorModal }) => {
      administratorModal.isOpen = true;
      administratorModal.mode = 'create';
      administratorModal.temporal = null;
    });
  };

  const openEditModal = (administrator: Administrator) => {
    patch(({ administratorModal }) => {
      administratorModal.isOpen = true;
      administratorModal.mode = 'edit';
      administratorModal.temporal = administrator;
    });
  };

  const closeModal = () => {
    patch(({ administratorModal }) => {
      administratorModal.isOpen = false;
    });
  };

  return { closeModal, openModal, openEditModal, ...administratorModal };
};
