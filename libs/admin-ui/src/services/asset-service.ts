import { useCloudinaryApi } from '../lib';
import {
  Asset,
  useCreateResourceMutation,
  AssetBoot,
  useDeleteResourceMutation,
  useEditResourceMutation,
} from '../common';
import { pluck, SafeAny, isValid } from '@wellness/common';
import { useCallback } from 'react';
export const useAssetService = () => {
  const { uploadFile } = useCloudinaryApi();
  const [mutateCreateResource] = useCreateResourceMutation();
  const [mutateDeleteResource] = useDeleteResourceMutation();
  const [mutateEditResource] = useEditResourceMutation();
  const createAsset = useCallback(async (file: File) => {
    const response = await uploadFile(file);
    const { data } = await mutateCreateResource({
      variables: {
        resource: {
          isMultiple: false,
          metadata: response,
        },
      },
    });
    return data?.createResource as Asset;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createAssetBoot = useCallback(async (files: File[]) => {
    const uploads = files.map((file) => uploadFile(file));
    const uploadsResponses = await Promise.all(uploads);
    const { data } = await mutateCreateResource({
      variables: {
        resource: {
          isMultiple: true,
          metadatas: uploadsResponses,
        },
      },
    });
    return data?.createResource as AssetBoot;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteAsset = useCallback(async (id: number) => {
    const result = await mutateDeleteResource({
      variables: {
        input: {
          id: String(id),
          isMultiple: false,
        },
      },
    });
    return pluck(result, 'data.deleteResource') as Asset;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteAssetBoot = useCallback(async (id: number) => {
    const result = mutateDeleteResource({
      variables: {
        input: {
          id: String(id),
          isMultiple: true,
        },
      },
    });
    return pluck(result, 'data.deleteResource') as Asset;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateAsset = async (asset: Asset, source: File | string) => {
    const isString = typeof source === 'string';
    if (!isValid(asset)) {
      return null;
    }
    if (!isString) {
      const response = await uploadFile(source as SafeAny);
      const result = await mutateEditResource({
        variables: {
          resource: {
            id: asset.id,
            metadata: response,
          },
        },
      });
      return result.data?.editResource as Asset;
    }
    return asset;
  };

  return {
    createAsset,
    createAssetBoot,
    deleteAsset,
    deleteAssetBoot,
    updateAsset,
  };
};
