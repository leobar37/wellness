import { Ficha } from '@wellness/admin-ui/common';
import { immer } from '@wellness/admin-ui/lib/zuztand';
import { makeToggle, pipe } from '@wellness/admin-ui/utils';
import { SafeAny } from '@wellness/common';
import _create from 'zustand';
import { IClientStore } from '../domain/client.store';
const create = pipe(immer, _create) as typeof _create;

export const useClientsStore = create<IClientStore>((set, get) => {
  return {
    // state
    // clients
    clientModal: {
      isOpen: false,
      selectClient: null,
      mode: 'create',
    },
    selectDeleteClients: [],
    clients: [],
    selectClient: null,
    // ficha
    modalCrudFicha: false,
    modeModalFicha: 'open',
    stateModalFicha: 'create',
    toggleModalFicha: makeToggle('modalCrudFicha', set),
    // selected ficha
    selectedFicha: null,
    modalShowFicha: false,
    toggleModalShowFicha: makeToggle('modalShowFicha', set),
    ficha: null,
    fichas: null,
    // contract modal
    contractsFeature: {
      modalContract: {
        isOpen: false,
        state: 'create',
      },
    },
    selectFicha: (ficha: Ficha) => {
      set((state) => {
        state.selectedFicha = ficha;
      });
      get().toggleModalShowFicha(true);
    },
    addFicha: (ficha) => {
      set((state) => {
        state.fichas.push(ficha);
      });
    },
    currentDetail: () => {
      const ficha = get().ficha;
      if (ficha) {
        return ficha.details[0];
      }
      return null;
    },
    // asistence
    createAsistencesModal: false,
    asistences: [],
    addAsistence: (asistence) => {
      set((state) => {
        state.asistences.push(asistence);
      });
    },
    deleteAsistence: (asistence) => {
      set((state) => {
        state.asistences = state.asistences.filter(
          (a) => a.id !== asistence.id
        );
      });
    },
    // General
    patch: set as SafeAny,
    // Modals
    toggleClientAsistenceModal: makeToggle('createAsistencesModal', set),
    toggleClientModal: makeToggle('clientModal', set),

    // Business logic
    setDeleteClients: (value) => {
      set({ selectDeleteClients: value });
    },
  };
});

export const useClientCrudModal = () => {
  const { patch, clientModal, selectClient } = useClientsStore();
  const openModal = (edit = false) => {
    patch((state) => {
      const _clientModal = state.clientModal;
      _clientModal.isOpen = true;
      if (edit) {
        _clientModal.selectClient = selectClient;
        _clientModal.mode = 'edit';
      }
    });
  };

  const closeModal = () => {
    patch((state) => {
      state.clientModal.isOpen = false;
      state.clientModal.selectClient = null;
    });
  };

  return {
    isOpen: clientModal.isOpen,
    openModal,
    closeModal,
    mode: clientModal.mode,
    client: clientModal?.selectClient,
  };
};
