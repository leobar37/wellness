import { Client } from '@wellness/admin-ui';
export interface IClientStore {
  clients: Client[];
  clientModal: boolean;
  selectDeleteClients: Client[];
  // actions
  toggleClientModal(value?: boolean): void;
  patch(state: Partial<IClientStore>): void;
  setDeleteClients(clients: Client[]): void;
}
