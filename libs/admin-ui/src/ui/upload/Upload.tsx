import {
  Center,
  chakra,
  Img,
  SystemStyleObject,
  useToken,
} from '@chakra-ui/react';
import { isValid } from '@wellness/common';
import { isString } from 'lodash';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadImageConfig, useConfig } from '../../config';
import { FileIcon } from '../../icons';
import { ImageUploadProps, MFile } from './types';
/**
 * TODO:
 * - add validation
 * - preview recognition
 * - Handle errors
 */
export const ImageUpload: FC<ImageUploadProps> = ({
  multiples,
  preview = true,
  placeHolderElment,
  onFile,
  width,
  height,
  image,
  ...extraProps
}) => {
  const [gray500, gray600] = useToken('colors', ['gray.500', 'gray.600']);
  const [files, setFiles] = useState<MFile | MFile[] | null>(null);
  const config = useConfig<UploadImageConfig>('uploadImage');

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Do something with the files
      if (!multiples) {
        const file = acceptedFiles.pop();
        if (file) {
          const mFile = Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
          setFiles(mFile);
          onFile({
            source: mFile,
            isArray: false,
          });
        }
      } else {
        const files = acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );

        onFile({
          source: files,
          isArray: true,
        });
        setFiles(files);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const hasFile = isValid(files);
  const hasFiles = hasFile && Array.isArray(files);

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
    maxFiles: multiples ? config.maxFiles : 1,
  });

  const makeBorder = (color: string) => {
    return `2px dashed ${color}`;
  };

  const renderPreview = (files: MFile | MFile[]) => {
    if (preview && !Array.isArray(files)) {
      const file = files;
      if (!file) {
        return null;
      }
      return (
        <Img
          objectFit="contain"
          src={isString(file) ? file : file.preview}
          width={config.width}
          height={config.height}
        />
      );
    }

    return null;
  };

  const getSize = () => {
    if (width) {
      return {
        width: width,
        height: height,
      };
    }
    return {
      width: config.width + 'px',
      height: config.height + 'px',
    };
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
      ...{ ...getSize() },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isDragActive, gray600]
  );
  const renderPlaceHolder = () => {
    if (multiples && placeHolderElment) {
      return placeHolderElment();
    }
    if ((files === null || files === undefined) && placeHolderElment) {
      if (isValid(image)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return renderPreview(image!);
      }
      return placeHolderElment();
    }
    if (preview && placeHolderElment) {
      return renderPreview(files as MFile);
    }
    return null;
  };

  return (
    <Center
      border={makeBorder(gray500)}
      borderRadius="10px"
      width={config.width + 'px'}
      height={config.height + 'px'}
      sx={uploadStyle}
      {...extraProps}
      {...getRootProps()}
    >
      <chakra.input {...getInputProps()} />

      {renderPlaceHolder()}
    </Center>
  );
};

ImageUpload.defaultProps = {
  placeHolderElment: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const gray600 = useToken('colors', 'gray.500');
    return (
      <Center flexDirection="column">
        <FileIcon
          fontSize="md"
          containerPrps={{
            border: `2px solid ${gray600}`,
            borderRadius: '50%',
            p: '3',
            color: 'gray.400',
          }}
        />
        {/* <Text fontSize="small" textAlign="center" lineHeight="4" mt="2">
          Agregue una imagen o video
        </Text> */}
      </Center>
    );
  },
};
