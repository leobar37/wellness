export interface IClientStore {
  clientModal: boolean;
  // actions

  toggleClientModal(value?: boolean): void;
}
