import { useClientsStore } from './client-store';
import { IClientStore } from '../domain';
import { useCallback } from 'react';
import produce from 'immer';

export const useContractsFeature = () => {
  const store = useClientsStore(
    useCallback((state) => state.contractsFeature, [])
  );
  const { patch } = useClientsStore();
  const patchContractsStore = (
    fn: (store: IClientStore['contractsFeature']) => void
  ) => {
    const feStore = produce(store, fn);
    patch({
      contractsFeature: feStore,
    });
  };

  return [store, { patchContractsStore }] as const;
};

export const useContractModal = () => {
  const [{ modalContract }, { patchContractsStore }] = useContractsFeature();
  const openModal = (edit = false) => {
    patchContractsStore((state) => {
      state.modalContract.isOpen = true;
    });
  };
  const closeModal = () => {
    patchContractsStore((state) => {
      state.modalContract.isOpen = false;
    });
  };
  return {
    isOpen: modalContract.isOpen,
    openModal,
    closeModal,
  };
};
