import { Client } from '@wellness/admin-ui';

export interface IClientStore {
  clients: Client[];
  clientModal: boolean;
  selectDeleteClients: Client[];

  selectClient: Client | null;

  // asistences
  createAsistencesModal: boolean;

  // actions
  toggleClientModal(value?: boolean): void;
  patch(state: Partial<IClientStore>): void;
  setDeleteClients(clients: Client[]): void;

  // asistences
  toggleClientAsistenceModal(value?: boolean): void;
}
