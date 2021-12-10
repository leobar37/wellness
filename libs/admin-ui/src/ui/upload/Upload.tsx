import {
  Box,
  BoxProps,
  Center,
  chakra,
  Img,
  SystemStyleObject,
  useToken,
} from '@chakra-ui/react';
import { isValid } from '@wellness/common';
import { useField } from 'formik';
import NextImage from 'next/image';
import React, {
  FC,
  ReactElement,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDropzone } from 'react-dropzone';
import { Swiper, SwiperSlide } from 'swiper/react';
import { UploadImageConfig, useConfig } from '../../config';
import { DeleteIcon, FileIcon } from '../../icons';
import { ButtonIcon } from '../button';
import { MFile } from './types';
export type ImageUploadProps = {
  preview?: boolean;
  /** allow multiples images; by default is false */
  multiples?: boolean;

  /**
   * placeholder image
   */
  placeHolderElment?: () => ReactElement;
  onFile: <T extends boolean>(options: {
    source: T extends true ? MFile[] : MFile;
    isArray: T;
  }) => void;
} & BoxProps;

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
      return (
        <NextImage
          objectFit="contain"
          src={file.preview}
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
/**
 * This is a integration with formik
 */
type UploadOneProps = {
  name: string;
} & Omit<ImageUploadProps, 'onFile'>;

export const UploadOne: FC<UploadOneProps> = ({ name, ...extraProps }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <ImageUpload
      onFile={({ source, isArray }) => {
        if (!isArray) {
          helpers.setValue(source);
        }
      }}
      {...extraProps}
    />
  );
};
type UploadMultipleProps = {
  name: string;
} & Omit<ImageUploadProps, 'onFile'>;

const SlideImage = ({ file }: { file: MFile }) => {
  return (
    <Box
      width={'150px'}
      height={'150px'}
      borderRadius="lg"
      overflow="hidden"
      position="relative"
      cursor={'pointer'}
      sx={{
        _hover: {
          '.overlay': {
            display: 'flex',
          },
        },
      }}
    >
      <Img
        position="absolute"
        objectFit="cover"
        w="full"
        h="full"
        src={file.preview}
      />
      <Center
        className="overlay"
        position="absolute"
        w="full"
        h="full"
        bg="#000"
        display="none"
        opacity="80%"
      >
        <ButtonIcon
          _hover={{
            bg: 'brown.300',
            border: '2px solid white',
            '.icon': {
              color: 'white',
            },
          }}
          bg="white"
        >
          <DeleteIcon color={'brown.300'} className="icon" />
        </ButtonIcon>
      </Center>
    </Box>
  );
};

export const UploadMultiple: FC<UploadMultipleProps> = ({
  name,
  ...extraProps
}) => {
  const [field, meta, helpers] = useField(name);
  const [files, setFiles] = useState<MFile[]>([]);
  const filesRef = useRef<MFile[]>([]);
  const mapFiles = (file: MFile, idx: number) => {
    return (
      <SwiperSlide>
        <SlideImage key={idx} file={file} />;
      </SwiperSlide>
    );
  };

  return (
    <Box>
      <Swiper slidesPerView={3}>{files.map(mapFiles)}</Swiper>
      <ImageUpload
        width="90px"
        height="90px"
        multiples={true}
        onFile={({ source, isArray }) => {
          if (isArray) {
            filesRef.current = [...filesRef.current, ...(source as MFile[])];
            setFiles(filesRef.current);
          }
        }}
        {...extraProps}
      />
    </Box>
  );
};
