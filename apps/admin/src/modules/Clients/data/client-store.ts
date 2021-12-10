import { makeToggle } from '@wellness/admin-ui/utils';
import _create from 'zustand';
import { useState } from 'react';
import {
  useCreateAsistenceMutation,
  InputAsistence,
  useFindAsistencesQuery,
} from '@wellness/admin-ui/common';
import { IClientStore } from '../domain/client.store';
import { ID, SafeAny } from '@wellness/common';
import { pipe } from '@wellness/admin-ui/utils';
import { immer } from '@wellness/admin-ui/lib/zuztand';
import _ from 'lodash.mergewith/node_modules/@types/lodash';

const create = pipe(immer, _create) as typeof _create;

export const useClientsStore = create<IClientStore>((set, get) => {
  // const [value, setvalue] = useState(true);
  return {
    // state
    // clients
    clientModal: false,
    selectDeleteClients: [],
    clients: [],
    selectClient: null,
    // ficha
    modalCrudFicha: false,
    modeModalFicha: 'open',
    toggleModalFicha: makeToggle('modalCrudFicha', set),

    // asistence
    createAsistencesModal: false,
    asistences: [],
    addAsistence: (asistence) => {
      set((state) => {
        state.asistences.push(asistence);
      });
    },
    deleteAsistence: (asistence) => {
      set((state) => {
        state.asistences = state.asistences.filter(
          (a) => a.id !== asistence.id
        );
      });
    },
    // General
    patch: set as SafeAny,
    // Modals
    toggleClientAsistenceModal: makeToggle('createAsistencesModal', set),
    toggleClientModal: makeToggle('clientModal', set),

    // Business logic
    setDeleteClients: (value) => {
      set({ selectDeleteClients: value });
    },
  };
});
