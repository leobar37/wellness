/* eslint-disable react-hooks/exhaustive-deps */
import {
  Ficha,
  useDeleteFichaMutation,
  useGetFichaQuery,
  useGetFichasQuery,
  useOpenAndCloseMutation,
  useUpdateFichaMutation,
  DetailFicha,
} from '@wellness/admin-ui/common';
import { useAssetService } from '@wellness/admin-ui/services';
import { difference, ID, SafeAny } from '@wellness/common';
import { useCallback, useEffect } from 'react';
import { useClientsStore } from '../data/client-store';
import { get } from 'lodash';
import { DetailFichaT } from '../domain/schemas';
const { patch } = useClientsStore.getState();
export const useGetFichas = () => {
  const { selectClient } = useClientsStore();
  const result = useGetFichasQuery({
    variables: {
      userId: Number(selectClient.id),
    },
    skip: !selectClient.id,
    fetchPolicy: 'network-only',
  });
  return {
    ...result,
    data: get(result, 'data.getFichas', null) as Ficha[],
  };
};

export const useGetFicha = () => {
  const { selectClient } = useClientsStore();

  const result = useGetFichaQuery({
    variables: {
      userId: Number(selectClient.id),
    },
  });
  const currentDetail = () => {
    return get(result, 'data.getFicha.details[0]', null) as DetailFicha;
  };
  return {
    ...result,
    data: get(result?.data, 'getFicha', null) as Ficha,
    currentDetail,
  };
};
export const useFichaController = () => {
  const [openAndCloseFicha] = useOpenAndCloseMutation();
  const { createAssetBoot, deleteAsset, createAsset } = useAssetService();
  const { selectClient } = useClientsStore();
  const [updateFichaMutation] = useUpdateFichaMutation();
  const [deleteFichaMutation] = useDeleteFichaMutation();
  const { currentDetail, data: ficha } = useGetFicha();
  const fichasQuery = useGetFichas();

  const fichaQuery = useGetFicha();

  const createFicha = useCallback(
    async ({ note, weight, files }: DetailFichaT) => {
      const assetBoot = await createAssetBoot(files);
      const result = await openAndCloseFicha({
        variables: {
          input: {
            open: true,
            weight: Number(weight),
            objective: note,
            clientId: Number(selectClient.id),
            assetId: Number(assetBoot.id),
          },
        },
      });
      fichaQuery.refetch();
      return ficha;
    },
    [selectClient.id]
  );

  const closeFicha = async ({ note, weight, files }: DetailFichaT) => {
    const assetBoot = await createAssetBoot(files);
    const { data } = await openAndCloseFicha({
      variables: {
        input: {
          open: false,
          weight: Number(weight),
          objective: note,
          clientId: Number(selectClient.id),
          assetId: Number(assetBoot.id),
          fichaId: ficha.id,
        },
      },
    });

    const fichaResult = data.openAndCloseFicha as Ficha;
    fichaQuery.refetch();
    fichasQuery.refetch();
    return fichaResult;
  };

  const editFicha = async ({ note, weight, files }: DetailFichaT) => {
    const detail = currentDetail();
    const urls = detail.asset.assets.map((asset) => asset.previewUrl);
    const urlsPreserved = files.filter((file) => typeof file === 'string');
    const filesForUpload = files.filter((file) => typeof file !== 'object');

    const urlsToDelete = difference(urls, urlsPreserved);
    const assets = urlsToDelete.map(async (url) => {
      const asset = detail.asset.assets.find(
        (asset) => asset.previewUrl === url
      );
      return deleteAsset(Number(asset.id));
    });
    await Promise.all(assets);

    const newAssets = filesForUpload.map((file) => createAsset(file));

    await Promise.all(newAssets);

    const data = await updateFichaMutation({
      variables: {
        detailId: Number(detail.id),
        input: {
          open: detail.open,
          weight: Number(weight),
          objective: note,
          clientId: Number(selectClient.id),
          // This field not should be editable
          assetId: Number(detail.asset.id),
          fichaId: ficha.id,
        },
      },
    });

    fichasQuery.refetch();
    return data.data.updateFicha as Ficha;
  };

  const deleteFicha = async (fichaId: ID) => {
    const resp = await deleteFichaMutation({
      variables: {
        fichaId: Number(fichaId) as SafeAny,
      },
    });
    patch({
      ficha: null,
    });

    fichaQuery.refetch();
    fichasQuery.refetch();
    return resp.data.deleteFicha as Ficha;
  };

  return {
    createFicha,
    closeFicha,
    editFicha,
    deleteFicha,
  };
};
