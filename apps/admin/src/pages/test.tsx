import { Button, useToast, Wrap, WrapItem } from '@chakra-ui/react';
import {
  useModalConfirm,
  useNoticeModal,
  ErrorContentModal,
} from '@wellness/admin-ui/ui/dialogs';
import React from 'react';
import {
  Modal,
  useDisclosure,
  ModalOverlay,
  CloseButton,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Text,
  Heading,
} from '@chakra-ui/react';
function ToastStatusExample() {
  const toast = useToast();
  const statuses = ['success', 'error', 'warning', 'info'] as const;

  return (
    <Wrap>
      {statuses.map((status, i) => (
        <WrapItem key={i}>
          <Button
            onClick={() =>
              toast({
                title: `${status} toast`,
                status: status,
                isClosable: true,
              })
            }
          >
            Show {status} toast
          </Button>
        </WrapItem>
      ))}
    </Wrap>
  );
}

function Test() {
  const showNotice = useNoticeModal();
  return (
    <div>
      <ErrorContentModal />
      <Button
        onClick={() => {
          showNotice({
            description: 'Open the modal plis',
          });
        }}
      >
        click me
      </Button>
    </div>
  );
}

export default Test;
