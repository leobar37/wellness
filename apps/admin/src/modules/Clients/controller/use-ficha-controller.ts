/* eslint-disable react-hooks/exhaustive-deps */
import { useOpenAndCloseMutation } from '@wellness/admin-ui/common';
import { DetailFichaT } from '../data/schemas';
import { useCallback } from 'react';
import { useClientsStore } from '../data/client-store';

export const useFichaController = () => {
  const [openAndCloseFicha] = useOpenAndCloseMutation();
  const { selectClient } = useClientsStore();
  const createFicha = useCallback(
    async ({ note, weight }: DetailFichaT) => {
      const result = await openAndCloseFicha({
        variables: {
          input: {
            open: true,
            weight: Number(weight),
            objective: note,
            clientId: Number(selectClient.id),
          },
        },
      });
      console.log('FIcha', result);
    },
    [selectClient.id]
  );

  return {
    createFicha,
  };
};
