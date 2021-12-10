import {
  useCreateAsistenceMutation,
  InputAsistence,
  useFindAsistencesQuery,
  Asistence,
  useDeleteAsistenceMutation,
} from '@wellness/admin-ui/common';
import { ID, SafeAny } from '@wellness/common';
import { CreateAsistenceT } from '../data/schemas';
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
  });
  const asistences = dataAsistences?.finAsistences;
  const createAsistence = async (asistence: CreateAsistenceT) => {
    const data = await mutateAsistence({
      variables: {
        asistence: {
          clientId: String(clientId),
          note: asistence.note,
        },
      },
    });
    addAsistence(data.data.createAsistence as SafeAny);
  };

  // const deleteAsistence = async (asistenceId: Asistence) => {};
  useEffect(() => {
    if (asistences) {
      patch({
        asistences: asistences as SafeAny,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataAsistences]);

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
