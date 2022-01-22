import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';
import { useDialogs } from './use-dialog-store';
export const ShowNoticeModal = () => {
  const { isOpen, notice } = useDialogs((state) => state.noticeModal);
  return (
    <Modal isOpen={isOpen} onClose={notice.onClose} isCentered>
      <ModalOverlay />
      <ModalContent minW={'450px'}>
        <ModalCloseButton />
        <ModalBody mt={8} py={8}>
          <Heading size={'md'} textAlign={'center'}>
            {notice.description}
          </Heading>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
