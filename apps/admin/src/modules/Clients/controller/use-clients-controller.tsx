import {
  useRegisterClientMutation,
  useGetClientsQuery,
} from '@wellness/admin-ui/common/generated-types';
import { Asset } from '@wellness/admin-ui';
import { isValid, pluck } from '@wellness/common';
import { useAssetService, ModeRegiser, Client } from '@wellness/admin-ui';
import { SaveClientSchena } from '../data/schemas';
import { useClientsStore } from '../data/client-store';

import * as React from 'react';
const { patch } = useClientsStore.getState();

export const useClientsController = () => {
  const [mutRegisterClient, { loading, data }] = useRegisterClientMutation();
  const { data: dataClients } = useGetClientsQuery();
  const { createAsset } = useAssetService();

  React.useEffect(() => {
    if (dataClients) {
      patch({
        clients: dataClients.clients as Client[],
      });
    }
  }, [dataClients]);

  // TODO: memoize this function
  const registerClient = async (values: SaveClientSchena) => {
    let asset: Asset = null;
    if (isValid(values.imageProfile)) {
      const assetResult = await createAsset(values.imageProfile);
      asset = assetResult;
    }
    const result = await mutRegisterClient({
      variables: {
        client: {
          direction: values.direction,
          dni: values.dni,
          email: values.email,
          lastName: values.lastName,
          modeRegister: ModeRegiser.ADMIN,
          note: values.note,
          name: values.name,
          birthday: values.birth,
          sex: values.sex,
          photoId: asset ? Number(asset.id) : null,
          phone: values.phone,
        },
      },
    });
    return pluck(result, 'data.registerClient') as Client;
  };

  return {
    registerClient,
    clients: dataClients?.clients ?? [],
  };
};
