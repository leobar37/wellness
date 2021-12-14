import { Client, Asistence, Ficha, ModeAction } from '@wellness/admin-ui';
import { SetState } from 'zustand';

export interface IClientStore {
  clients: Client[];
  clientModal: boolean;
  selectDeleteClients: Client[];

  selectClient: Client | null;

  //  ficha
  modalCrudFicha: boolean;
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
