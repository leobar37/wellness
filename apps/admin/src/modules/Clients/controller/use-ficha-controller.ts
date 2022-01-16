/* eslint-disable react-hooks/exhaustive-deps */
import {
  Ficha,
  useDeleteFichaMutation,
  useGetFichaQuery,
  useGetFichasQuery,
  useOpenAndCloseMutation,
  useUpdateFichaMutation,
} from '@wellness/admin-ui/common';
import { useAssetService } from '@wellness/admin-ui/services';
import { difference } from '@wellness/common';
import { useCallback, useEffect } from 'react';
import { useClientsStore } from '../data/client-store';
import { DetailFichaT } from '../domain/schemas';

const { patch, addFicha } = useClientsStore.getState();

export const useFichaController = () => {
  const [openAndCloseFicha] = useOpenAndCloseMutation();
  const { createAssetBoot, deleteAsset, createAsset } = useAssetService();
  const { selectClient, ficha, currentDetail } = useClientsStore();
  const [updateFichaMutation] = useUpdateFichaMutation();
  const [deleteFichaMutation] = useDeleteFichaMutation();
  const {
    data: fichasData,
    loading,
    refetch,
  } = useGetFichasQuery({
    variables: {
      userId: Number(selectClient.id),
    },
    fetchPolicy: 'network-only',
  });

  const { data: fichaData } = useGetFichaQuery({
    variables: {
      userId: Number(selectClient.id),
    },
  });

  useEffect(() => {
    if (fichaData?.getFicha) {
      patch({
        ficha: fichaData.getFicha as Ficha,
      });
    }
  }, [fichaData]);

  useEffect(() => {
    if (fichasData?.getFichas) {
      console.log(fichasData.getFichas);
      patch({
        fichas: fichasData.getFichas as Ficha[],
      });
    }
  }, [fichasData]);

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
      const rficha = result.data.openAndCloseFicha as Ficha;
      addFicha(rficha);
      patch({
        ficha: rficha,
      });
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
    patch({
      ficha: null,
    });
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

    return data.data.updateFicha as Ficha;
  };

  const deleteFicha = async (fichaId: number) => {
    const resp = await deleteFichaMutation({
      variables: {
        fichaId: fichaId,
      },
    });
    return resp.data.deleteFicha as Ficha;
  };

  return {
    createFicha,
    closeFicha,
    editFicha,
    deleteFicha,
  };
};
