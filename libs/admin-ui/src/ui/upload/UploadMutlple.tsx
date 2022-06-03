import { Box, Center, Img } from '@chakra-ui/react';
import { useField } from 'formik';
import React, { FC, useRef, useState } from 'react';
import { SafeAny } from '@wellness/common';
import { Swiper, SwiperSlide } from 'swiper/react';
import { DeleteIcon } from '../../icons';
import { ButtonIcon } from '../button';
import { ImageUploadProps, MFile } from './types';
import { ImageUpload } from './Upload';
import { isString } from 'lodash';
type UploadMultipleProps = {
  name: string;
} & Omit<ImageUploadProps, 'onFile'>;

const SlideImage = ({
  file,
  onDelete,
}: {
  file: MFile;
  onDelete: (...args: SafeAny) => void;
}) => {
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
        src={isString(file) ? file : file.preview}
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
          onClick={() => onDelete(file)}
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

  const [files, setFiles] = useState<MFile[]>(meta.value);
  const filesRef = useRef<MFile[]>(meta.value);

  const onDelete = (file: MFile) => {
    const newFiles = files.filter((f) => f !== file);
    filesRef.current = newFiles;
    helpers.setValue(newFiles);
    setFiles(newFiles);
  };

  const mapFiles = (file: MFile, idx: number) => {
    return (
      <SwiperSlide key={idx}>
        <SlideImage onDelete={onDelete} key={idx} file={file} />;
      </SwiperSlide>
    );
  };

  return (
    <Box>
      <Swiper slidesPerView={3}>{files.map(mapFiles)}</Swiper>
      <ImageUpload
        width="90px"
        height="90px"
        multiples
        onFile={({ source, isArray }) => {
          if (isArray) {
            filesRef.current = [...filesRef.current, ...(source as MFile[])];
            setFiles(filesRef.current);
            helpers.setValue(filesRef.current);
          }
        }}
        {...extraProps}
      />
    </Box>
  );
};
