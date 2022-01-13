import {
  Asset,
  Client,
  ModeRegiser,
  useAssetService,
} from '@wellness/admin-ui';
import {
  useGetClientsQuery,
  useRegisterClientMutation,
  useUpdateClientMutation,
} from '@wellness/admin-ui/common/generated-types';
import { isValid, pluck } from '@wellness/common';
import * as React from 'react';
import { useCallback } from 'react';
import { useClientCrudModal } from '../data';
import { useClientsStore } from '../data/client-store';
import { SaveClientSchena } from '../domain/schemas';

const { patch } = useClientsStore.getState();

export const useInitClientsController = () => {
  const { data: dataClients } = useGetClientsQuery();
  React.useEffect(() => {
    if (dataClients) {
      patch({
        clients: dataClients.clients as Client[],
      });
    }
  }, [dataClients]);

  return {
    clients: dataClients?.clients ?? [],
  };
};

const mapClient = (values: SaveClientSchena) => {
  return {
    direction: values.direction,
    dni: values.dni,
    email: values.email,
    lastName: values.lastName,
    modeRegister: ModeRegiser.ADMIN,
    name: values.name,
    birthday: values.birth,
    sex: values.sex,
    phone: values.phone,
  };
};

export const useClientsController = () => {
  const [mutRegisterClient] = useRegisterClientMutation();
  const [mutUpdateClient] = useUpdateClientMutation();
  const { createAsset, updateAsset } = useAssetService();
  const { client } = useClientCrudModal();
  const registerClient = useCallback(
    async (values: SaveClientSchena) => {
      let asset: Asset = null;
      if (isValid(values.imageProfile)) {
        const assetResult = await createAsset(values.imageProfile);
        asset = assetResult;
      }
      const result = await mutRegisterClient({
        variables: {
          client: {
            ...mapClient(values),
            photoId: asset ? Number(asset.id) : null,
          },
        },
      });
      const clientSaved = pluck(result, 'data.registerClient') as Client;
      patch((state) => {
        state.clients.push(clientSaved);
      });
      return clientSaved;
    },
    [createAsset, mutRegisterClient]
  );
  const updateClient = async (values: SaveClientSchena) => {
    let asset: Asset = null;
    if (
      !client?.photo &&
      values.imageProfile &&
      typeof values.imageProfile !== 'string'
    ) {
      asset = await createAsset(values.imageProfile);
    }
    asset = await updateAsset(client.photo, values.imageProfile);
    const result = await mutUpdateClient({
      variables: {
        id: client.id,
        input: {
          ...mapClient(values),
          photoId: isValid(asset) ? Number(asset.id) : null,
        },
      },
    });

    const clientUpdated = result.data.updateCLient as Client;
    patch((state) => {
      state.selectClient = clientUpdated;
    });
    return clientUpdated;
  };
  return {
    registerClient,
    updateClient,
  };
};
