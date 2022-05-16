import {
  useCreateAsistenceMutation,
  InputAsistence,
  useFindAsistencesQuery,
  Asistence,
  useDeleteAsistenceMutation,
} from '@wellness/admin-ui/common';
import { ID, SafeAny } from '@wellness/common';
import { CreateAsistenceT } from '../domain/schemas';
import { useClientsStore } from '../data/client-store';
import { useEffect } from 'react';

export type useAsistenceControllerOptions = {
  clientId: ID;
};
export const useAsistenceController = ({
  clientId,
}: useAsistenceControllerOptions) => {
  const [mutateAsistence, { data }] = useCreateAsistenceMutation();
  const [mutateDeleteAsistence] = useDeleteAsistenceMutation();
  const {
    patch,
    addAsistence,
    deleteAsistence: deleteAction,
  } = useClientsStore();
  const { data: dataAsistences } = useFindAsistencesQuery({
    variables: { cliendId: String(clientId) },
    skip : !clientId,
    onCompleted : (data) => {
      patch({
        asistences: data.finAsistences as SafeAny,
      });
    },
    fetchPolicy : "cache-and-network"
  });
  const asistences = dataAsistences?.finAsistences;

  const createAsistence = async (asistence: CreateAsistenceT) => {
    const data = await mutateAsistence({
      variables: {
        asistence: {
          clientId: String(clientId),
          note: asistence.note,
          createdAt  : asistence.createdAt,
        },
      },
    });
    addAsistence(data.data.createAsistence as SafeAny);
  };
 
  const deleteAsistence = async (asistence: Asistence) => {
    const result = await mutateDeleteAsistence({
      variables: {
        id: String(asistence.id),
      },
    });
    deleteAction(asistence);
  };

  return {
    createAsistence,
    deleteAsistence,
  };
};
