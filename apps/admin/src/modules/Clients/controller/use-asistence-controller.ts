import {
  useCreateAsistenceMutation,
  InputAsistence,
} from '@wellness/admin-ui/common';
import { ID } from '@wellness/common';
import { CreateAsistenceT } from '../data/schemas';
export type useAsistenceControllerOptions = {
  clientId: ID;
};
export const useAsistenceController = ({
  clientId,
}: useAsistenceControllerOptions) => {
  const [mutateAsistence, { data }] = useCreateAsistenceMutation();

  const createAsistence = async (asistence: CreateAsistenceT) => {
    const data = await mutateAsistence({
      variables: {
        asistence: {
          clientId: String(clientId),
          note: asistence.note,
        },
      },
    });
    console.log(data);
  };

  return {
    createAsistence,
  };
};
