import {
  Button,
  HStack,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack
} from '@chakra-ui/react';
import React from 'react';
import { WarningIcon } from '../../icons';
import { useDialogs } from './use-dialog-store';

export const ConfirmModal = () => {
  const { confirmModal } = useDialogs();
  const { isOpen, onClose } = useDisclosure({
    isOpen: confirmModal.isOpen,
    onClose: confirmModal.onClose,
  });
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered id="confirmModal">
      <ModalOverlay />
      <ModalContent minW={'350px'} py={'8'} px={'4'}>
        <VStack spacing={'5'}>
          <HStack spacing={'5'}>
            <WarningIcon color={'orange.400'} fontSize={'6xl'} />
            <VStack align={'start'}>
              <Text fontWeight={'semibold'} fontSize={'lg'}>
                {confirmModal.info.title}
              </Text>
              <Text>{confirmModal.info.description}</Text>
            </VStack>
          </HStack>
          <HStack spacing={4} justify={'end'} w={'full'}>
            <Button onClick={() => confirmModal.onConfirm()} bg={'green.500'}>
              Confirmar
            </Button>
            <Button onClick={() => confirmModal.onClose()}>Cancelar</Button>
          </HStack>
        </VStack>
      </ModalContent>
    </Modal>
  );
};
