/* eslint-disable react-hooks/exhaustive-deps */
import {
  useOpenAndCloseMutation,
  Ficha,
  useGetFichaQuery,
  useGetFichasQuery,
} from '@wellness/admin-ui/common';
import { DetailFichaT } from '../data/schemas';

import { useCallback, useEffect } from 'react';
import { useClientsStore } from '../data/client-store';
import { useAssetService } from '@wellness/admin-ui/services';
const { patch, addFicha } = useClientsStore.getState();
export const useFichaController = () => {
  const [openAndCloseFicha] = useOpenAndCloseMutation();
  const { createAssetBoot } = useAssetService();
  const { selectClient, ficha } = useClientsStore();
  const {
    data: fichasData,
    loading,
    refetch,
  } = useGetFichasQuery({
    variables: {
      userId: Number(selectClient.id),
    },
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

  return {
    createFicha,
    closeFicha,
  };
};
