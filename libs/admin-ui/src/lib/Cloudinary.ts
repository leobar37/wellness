// see https://github.com/chickenLeobar/storeapp/blob/stagging/nimo/projects/shared/src/common/cloudinary/upload-cloudinary.service.ts
import { useApolloClient } from '@apollo/client';
import { CloudinaryResponse } from '@wellness/common';
import Axios from 'axios';
import { get } from 'lodash';
import { useCallback } from 'react';
import {
  GenerateSignatureDocument,
  GenerateSignatureMutation,
  GenerateSignatureMutationVariables,
  ResponseSignature,
} from '../common';
import { CloudinaryConfig, useConfig } from '../config';

type GenerateSignatureParams = {
  publicId?: string;
};

type uploadCloudinaryOptions = {
  timestamp: number;
  signature: string;
};
export const useCloudinaryApi = () => {
  const client = useApolloClient();
  const cloudinaryConfig = useConfig<CloudinaryConfig>('cloudinary');
  const generateSignature = useCallback(
    async ({ publicId }: GenerateSignatureParams) => {
      const resultMutation = await client.mutate<
        GenerateSignatureMutation,
        GenerateSignatureMutationVariables
      >({
        variables: {
          publicId: publicId,
        },
        mutation: GenerateSignatureDocument,
      });
      const responseSignature = get(
        resultMutation,
        'data.signature'
      ) as ResponseSignature;
      return responseSignature;
    },
    [client]
  );

  // const deleteResource = useCallback(
  //   async (publicId: string) => {
  //     const resultMutation = await client.mutate<
  //       DeleteResourceMutation,
  //       DeleteResourceMutationVariables
  //     >({
  //       variables: {
  //         publicId: publicId,
  //       },
  //       mutation: DeleteResourceDocument,
  //     });
  //     const result = get(resultMutation, 'data.deleteResource');
  //     return result;
  //   },
  //   [client]
  // );

  const uploadCloudinary = useCallback(
    async (file: File, options: uploadCloudinaryOptions) => {
      const formData = new FormData();
      const url = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/upload`;
      formData.append('file', file);
      formData.append('api_key', cloudinaryConfig.apiKey);
      formData.append('timestamp', String(options.timestamp));
      formData.append('upload_preset', cloudinaryConfig.uploadPreset);
      formData.append('signature', options.signature);
      const uploadedResponse = await Axios({
        method: 'POST',
        url: url,
        data: formData,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'multipart/form-data',
        },
      });
      return uploadedResponse.data as CloudinaryResponse;
    },
    [cloudinaryConfig]
  );

  // combinations
  const uploadFile = useCallback(
    async (file: File) => {
      const auth = await generateSignature({});
      return await uploadCloudinary(file, {
        signature: auth.signature,
        timestamp: auth.timestamp,
      });
    },
    [generateSignature, uploadCloudinary]
  );

  // const deleteAndCreateResource = useCallback(
  //   async (file: File, publicId: string | null | undefined) => {
  //     if (isValid(publicId)) {
  //       await deleteResource(publicId);
  //     }
  //     const cloudinaryResponse = await uploadFile(file);
  //     return cloudinaryResponse;
  //   },
  //   [deleteResource, uploadFile]
  // );

  return {
    uploadFile,
  };
};
