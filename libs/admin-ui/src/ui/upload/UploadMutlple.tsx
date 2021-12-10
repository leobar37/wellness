import { useToken } from '@chakra-ui/react';
import { SafeAny } from '@wellness/common';
import { useField } from 'formik';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadImageConfig, useConfig } from '../../config';
import { MFile } from './types';

type Props = {
  name: string;
};
export const ImageUploadMultiple = ({ name }: Props) => {
  const [field, meta, helpers] = useField(name);
  const [gray500, gray600] = useToken('colors', ['gray.500', 'gray.600']);
  const config = useConfig<UploadImageConfig>('uploadImage');
  const [image, setImage] = useState<MFile | null>(null);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Do something with the files
      const file = acceptedFiles.pop();
      helpers.setValue(file);
      setImage(
        Object.assign(file, {
          preview: URL.createObjectURL(file as SafeAny),
        })
      );
    },
    [helpers]
  );

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: '.jpeg,.png',
    onDrop: onDrop,
    maxFiles: config.maxFiles,
  });
};
