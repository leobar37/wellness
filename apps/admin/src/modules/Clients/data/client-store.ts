import { makeToggle } from '@wellness/admin-ui/utils';
import create from 'zustand';
import { IClientStore } from '../domain/client.store';

export const useClientsStore = create<IClientStore>((set, get) => {
  return {
    // state
    // clients
    clientModal: false,
    selectDeleteClients: [],
    clients: [],
    selectClient: null,

    // asistence
    createAsistencesModal: false,

    // General
    patch: (partialstate) => {
      set((state) => ({
        ...state,
        ...partialstate,
      }));
    },
    // Modals
    toggleClientAsistenceModal: makeToggle('createAsistencesModal', set),
    toggleClientModal: makeToggle('clientModal', set),

    // Business logic
    setDeleteClients: (value) => {
      console.log(value);
      set({ selectDeleteClients: value });
    },
  };
});
