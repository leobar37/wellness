import {
  BoxProps,
  Center,
  chakra,
  SystemStyleObject,
  Text,
  useToken,
  VStack,
} from '@chakra-ui/react';
import { isValid, SafeAny } from '@wellness/common';
import NextImage from 'next/image';
import React, { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadImageConfig, useConfig } from '../../config';
import { User } from '../../icons';
import { useField } from 'formik';
type MFile = {
  preview: string;
} & File;

export type ImageUploadProps = {
  name: string;
} & BoxProps;

/**
 * TODO:
 * - add validation
 * - preview recognition
 * - Handle errors
 */
export const ImageUpload = ({ name, ...extraProps }: ImageUploadProps) => {
  const [gray500, gray600] = useToken('colors', ['gray.500', 'gray.600']);
  const [image, setImage] = useState<MFile | null>(null);
  const config = useConfig<UploadImageConfig>('uploadImage');
  const [field, meta, helpers] = useField(name);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Do something with the files
      const file = acceptedFiles.pop();
      helpers.setValue(file);
      setImage(
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
    },
    [helpers]
  );

  const hasFile = isValid(image);

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
    maxFiles: 1,
  });

  const makeBorder = (color: string) => {
    return `2px dashed ${color}`;
  };
  const uploadStyle: SystemStyleObject = useMemo(
    () => ({
      _hover: {
        cursor: 'pointer',
      },
      ...(isDragActive && {
        border: makeBorder(gray600),
        background: 'blackAlpha.50',
      }),
      ...extraProps,
    }),
    [isDragActive, gray600, extraProps]
  );

  return (
    <Center
      border={makeBorder(gray500)}
      borderRadius="10px"
      width={config.width + 'px'}
      height={config.height + 'px'}
      sx={uploadStyle}
      {...getRootProps()}
    >
      <chakra.input {...getInputProps()} />
      {!hasFile ? (
        <VStack spacing={'0'} textAlign="center">
          <User color="gray.400" fontSize="lg" mt={2} />
          <Text color="gray.400" fontSize="sm">
            Foto de perfil
          </Text>
          <Text color="gray.400" fontSize="sm">
            400 x 400
          </Text>
        </VStack>
      ) : (
        <NextImage
          objectFit="contain"
          src={image?.preview as SafeAny}
          width={config.width}
          height={config.height}
        />
      )}
    </Center>
  );
};
