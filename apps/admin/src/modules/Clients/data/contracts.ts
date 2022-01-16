import { useClientsStore } from './client-store';
import { IClientStore } from '../domain';
import { useCallback } from 'react';
import produce from 'immer';
import { ContractView } from '@wellness/admin-ui';
import shallow from 'zustand/shallow';
import { isValid } from '@wellness/common';
export const useContractsFeature = () => {
  const store = useClientsStore(
    useCallback((state) => state.contractsFeature, []),
    shallow
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
  const [{ modalContract, refetch }, { patchContractsStore }] =
    useContractsFeature();
  const openModal = (contract?: ContractView) => {
    patchContractsStore((state) => {
      const _modalContract = state.modalContract;
      _modalContract.isOpen = true;
      if (isValid(contract)) {
        _modalContract.contract = contract;
        _modalContract.state = 'edit';
      } else {
        _modalContract.contract = null;
        _modalContract.state = 'create';
      }
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
    ...modalContract,
    refetch,
  };
};

export const useShowContractModal = () => {
  const [{ showModal }, { patchContractsStore }] = useContractsFeature();

  const openModal = (contract: ContractView) => {
    patchContractsStore((state) => {
      const _showModal = state.showModal;
      _showModal.contract = contract;
      _showModal.isOpen = true;
    });
  };

  const closeModal = () => {
    patchContractsStore((state) => {
      state.showModal.isOpen = false;
    });
  };

  return {
    openModal,
    closeModal,
    ...showModal,
  };
};
