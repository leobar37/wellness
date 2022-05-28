import {
  Client,
  Asistence,
  Ficha,
  ModeAction,
  ContractView,
  ClientReport,
} from '@wellness/admin-ui';

import { SetState } from 'zustand';

export interface IClientStore {
  clients: Client[];
  clientModal: {
    isOpen: boolean;
    selectClient: Client | null;
    mode: ModeAction;
  };
  clientReport: ClientReport | null;
  refetchClientReport: () => void;
  selectDeleteClients: Client[];
  // refresh

  selectClient: Client | null;
  // asistence
  asistenceModal: {
    isOpen: boolean;
    client: Client | null;
  };
  modalCrudFicha: boolean;
  // update queries
  //  ficha

  toggleModalFicha(value: boolean): void;
  toggleModalShowFicha(value: boolean): void;
  modeModalFicha: 'open' | 'close';
  stateModalFicha: ModeAction;
  ficha: Ficha | null;
  fichas: Ficha[] | null;
  addFicha(ficha: Ficha): void;
  currentDetail(): Ficha['details'][0];
  selectedFicha: Ficha | null;
  modalShowFicha: boolean;
  selectFicha(ficha: Ficha): void;
  // contract modal
  contractsFeature: {
    modalContract: {
      isOpen: boolean;
      state: ModeAction;
      contract: ContractView | null;
    };
    showModal: {
      isOpen: boolean;
      contract: ContractView | null;
    };
    refetch: null | (() => void);
  };
  // asistences
  createAsistencesModal: boolean;
  asistences: Asistence[];
  addAsistence: (asistence: Asistence) => void;
  deleteAsistence: (asistence: Asistence) => void;
  // actions
  toggleClientModal(value?: boolean): void;
  patch: SetState<IClientStore>;
  setDeleteClients(clients: Client[]): void;

  // asistences
  toggleClientAsistenceModal(value?: boolean): void;
}
