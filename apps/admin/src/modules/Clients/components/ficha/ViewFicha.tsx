import * as React from 'react';
import {
  Modal,
  useDisclosure,
  ModalBody,
  ModalOverlay,
  ModalContent,
  Heading,
  Box,
  HStack,
  Text,
  VStack,
  Img,
  CloseButton,
} from '@chakra-ui/react';
import { DetailInfo } from '@wellness/admin-ui/ui';
import { Ficha } from '@wellness/admin-ui/common';
import { get } from 'lodash';
type ViewFichaModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
import { useClientsStore } from '../../data/client-store';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
SwiperCore.use([Autoplay]);
import format from 'date-fns/format';

const { patch } = useClientsStore.getState();

const Side = ({ detail }: { detail: Ficha['details'][0] }) => {
  const renderAssets = detail.asset.assets.map((asset, idx) => {
    return (
      <SwiperSlide key={idx}>
        <Img src={asset.previewUrl} width={'350px'} objectFit={'cover'} />
      </SwiperSlide>
    );
  });
  return (
    <VStack spacing={5} maxW={'250px'} overflow={'hidden'}>
      <Text fontWeight={'semibold'}>
        {format(new Date(get(detail, 'createdAt')), 'dd/MM/yyyy')}
      </Text>
      <Swiper
        autoplay={true}
        centeredSlides={true}
        width={350}
        slidesPerView={1}
      >
        {renderAssets}
      </Swiper>
      <VStack align={'start'} ml="4" w="full">
        <DetailInfo title="Peso" value={String(detail.weight) + 'kg'} />
        <DetailInfo
          title="Objetivo"
          value={detail.objective}
          direction="vertical"
        />
      </VStack>
    </VStack>
  );
};

export const ViewFichaModal: React.FunctionComponent = () => {
  const { modalShowFicha, toggleModalShowFicha, selectedFicha, selectClient } =
    useClientsStore();
  const { isOpen, onClose } = useDisclosure({
    isOpen: modalShowFicha,
    onClose: () => {
      toggleModalShowFicha(false);
      patch({ selectedFicha: null });
    },
    onOpen: () => toggleModalShowFicha(true),
  });
  if (!selectedFicha || !selectedFicha?.details) return null;
  const [left, right] = selectedFicha.details;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalBody>
        <ModalContent
          borderRadius={'0'}
          position={'relative'}
          minW={'600px'}
          px="5"
          py="14"
        >
          <CloseButton
            onClick={() => onClose()}
            top="20px"
            right={'20px'}
            position={'absolute'}
          />
          <Heading size={'lg'} textAlign={'center'}>
            {selectClient.name}
          </Heading>
          <HStack
            spacing={2}
            mt={5}
            position={'relative'}
            justifyContent="space-between"
          >
            <Side detail={left} />
            <Box width={'5px'} bg="gray.400" h={'300px'} />
            <Side detail={right} />
          </HStack>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
};
