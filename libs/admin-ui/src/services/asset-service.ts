import { useApolloClient } from '@apollo/client';
import { useCloudinaryApi } from '../lib';
import {
  Asset,
  useCreateResourceMutation,
  AssetBoot,
  useDeleteResourceMutation,
} from '../common';
import { pluck } from '@wellness/common';
export const useAssetService = () => {
  const { uploadFile } = useCloudinaryApi();
  const [mutateCreateResource] = useCreateResourceMutation();
  const [mutateDeleteResource] = useDeleteResourceMutation();

  const createAsset = async (file: File) => {
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
  };

  const createAssetBoot = async (files: File[]) => {
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
  };

  const deleteAsset = async (id: number) => {
    const result = await mutateDeleteResource({
      variables: {
        input: {
          id: String(id),
          isMultiple: false,
        },
      },
    });

    return pluck(result, 'data.deleteResource') as Asset;
  };

  const deleteAssetBoot = async (id: number) => {
    const result = mutateDeleteResource({
      variables: {
        input: {
          id: String(id),
          isMultiple: true,
        },
      },
    });
    return pluck(result, 'data.deleteResource') as Asset;
  };

  return {
    createAsset,
    createAssetBoot,
    deleteAsset,
    deleteAssetBoot,
  };
};
