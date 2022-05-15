import { immer } from '@wellness/admin-ui/lib/zuztand';
import _create from 'zustand';
import { combine } from 'zustand/middleware';
import { pipe } from '@wellness/admin-ui/utils';
import { ModeAction, Administrator } from '@wellness/admin-ui';
import { Updater } from 'use-immer';
import { ID } from '@wellness/common';
const create = pipe(immer, _create) as typeof _create;

const initialState = {
  administratorModal: {
    isOpen: false,
    mode: 'edit' as ModeAction,
    temporal: null as Administrator,
  },
  changePasswordModal: {
    isOpen: false,
    idUser: null as ID,
  },
  changePasswordModalFromAdmin: {
    isOpen: false,
    idUser: null as ID,
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
    console.log('click here', administrator);

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

export const useChangePasswordModal = () => {
  const { patch, changePasswordModal } = useAdministratorStore();

  const openModal = (id: ID) => {
    patch(({ changePasswordModal }) => {
      changePasswordModal.isOpen = true;
      changePasswordModal.idUser = id;
    });
  };

  const closeModal = () => {
    patch(({ changePasswordModal }) => {
      changePasswordModal.isOpen = false;
      changePasswordModal.idUser = null;
    });
  };

  return { openModal, closeModal, ...changePasswordModal };
};

export const useChangePasswordModalFromAdmin = () => {
  const { patch, changePasswordModalFromAdmin } = useAdministratorStore();

  const openModal = (id: ID) => {
    patch(({ changePasswordModalFromAdmin }) => {
      changePasswordModalFromAdmin.isOpen = true;
      changePasswordModalFromAdmin.idUser = id;
    });
  };

  const closeModal = () => {
    patch(({ changePasswordModalFromAdmin }) => {
      changePasswordModalFromAdmin.isOpen = false;
      changePasswordModalFromAdmin.idUser = null;
    });
  };

  return { openModal, closeModal, ...changePasswordModalFromAdmin };
};
