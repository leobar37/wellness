import create from 'zustand';
import { IClientStore } from '../domain/client.store';

export const useClientsStore = create<IClientStore>((set, get) => {
  return {
    clientModal: false,
    toggleClientModal: (value?: boolean) => {
      return set((state) => ({ clientModal: value ?? !state.clientModal }));
    },
  };
});
