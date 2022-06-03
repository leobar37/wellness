import {
  Box,
  HStack,
  Img,
  Link,
  SystemStyleObject,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useModalConfirm } from '@wellness/admin-ui';
import { Ficha } from '@wellness/admin-ui/common';
import { DetailInfo } from '@wellness/admin-ui/ui';
import * as React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useFichaController } from '../../controller';
import { useClientsStore } from '../../data/client-store';
import { isNil } from 'lodash';
const { patch } = useClientsStore.getState();

const FichaPreview = ({ ficha }: { ficha: Ficha }) => {
  const linkStyles: SystemStyleObject = {
    color: 'gray.500',
    fontSize: 'sm',
  };

  const { deleteFicha } = useFichaController();
  const detail = ficha.details.find((detail) => detail.open);
  const confirm = useModalConfirm();
  if (isNil(detail)) {
    return null;
  }
  const renderAssets = () => {
    const assets = detail?.asset.assets;
    if (!assets) return [];
    return assets.map((asset) => (
      <SwiperSlide key={asset.id}>
        <Img
          src={asset.previewUrl}
          width="250px"
          objectFit="contain"
          height="250px"
        />
      </SwiperSlide>
    ));
  };

  return (
    <VStack zIndex={50} align="start" maxWidth="450px">
      <HStack spacing={4}>
        <Link
          sx={linkStyles}
          onClick={() =>
            patch({
              modalCrudFicha: true,
              modeModalFicha: 'close',
              stateModalFicha: 'create',
            })
          }
        >
          Cerrar ficha
        </Link>
        <Box height="16px" width="3px" bg="gray.400" />
        <Link
          sx={linkStyles}
          onClick={() =>
            patch({
              modalCrudFicha: true,
              modeModalFicha: 'open',
              stateModalFicha: 'edit',
            })
          }
        >
          Editar ficha
        </Link>
        <Box height="16px" width="3px" bg="gray.400" />
        <Link
          onClick={() => {
            confirm({
              onConfirm: () => {
                deleteFicha(Number(ficha.id));
              },
            });
          }}
          sx={linkStyles}
        >
          Eliminar ficha
        </Link>
      </HStack>

      <Box width={'250px'}>
        <Swiper slidesPerView={1} autoplay={true} speed={1000}>
          {renderAssets()}
        </Swiper>
      </Box>
      <Text fontWeight="semibold" color="gray.400">
        {/* {format(new Date(ficha.createdAt), 'dd/MM/yyyy')} */}
      </Text>
      <VStack spacing={1} mt={4} align="start">
        <DetailInfo title="Peso" value={detail.weight + ''} />
        <DetailInfo
          direction="vertical"
          title="Objetivo"
          value={detail.objective}
        />
      </VStack>
    </VStack>
  );
};

export default FichaPreview;
