import { ContractView } from '@wellness/admin-ui';
import { useSubscriptionsStore } from '../data';
export const useShowContractModal = () => {
  const { showContract, patch } = useSubscriptionsStore();

  const openModal = (contract: ContractView) => {
    patch((state) => {
      state.showContract.contract = contract;
      state.showContract.isOpen = true;
    });
  };

  const closeModal = () => {
    patch((state) => {
      state.showContract.contract = null;
      state.showContract.isOpen = false;
    });
  };
  return {
    ...showContract,
    openModal,
    closeModal,
  };
};
