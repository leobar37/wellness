import create from 'zustand';
import { IClientStore } from '../domain/client.store';

export const useClientsStore = create<IClientStore>((set, get) => {
  return {
    clientModal: false,
    selectDeleteClients: [],
    clients: [],
    toggleClientModal: (value?: boolean) => {
      return set((state) => ({ clientModal: value ?? !state.clientModal }));
    },
    patch: (partialstate) => {
      set((state) => ({
        ...state,
        partialstate,
      }));
    },
    setDeleteClients: (value) => {
      console.log(value);
      set({ selectDeleteClients: value });
    },
  };
});
