import { Client, Asistence } from '@wellness/admin-ui';
import { SetState } from 'zustand';
export interface IClientStore {
  clients: Client[];
  clientModal: boolean;
  selectDeleteClients: Client[];

  selectClient: Client | null;

  //  ficha
  modalCrudFicha: boolean;
  toggleModalFicha(value: boolean): void;
  modeModalFicha: 'open' | 'close';

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
