import {
  Box,
  Button,
  HStack,
  Modal,
  ModalOverlay,
  Text,
  VStack,
  ModalContent,
} from '@chakra-ui/react';
import { FC } from 'react';
import { ErrorIcon } from '../../icons';
import { useDialogs } from './use-dialog-store';
export type ErrorContentModalProps = {
  title: string;
  description: string;
  onClose?: () => void;
};
export const ErrorContentModal: FC<ErrorContentModalProps> = ({
  description,
  title,
  onClose,
}) => {
  return (
    <Box>
      <HStack spacing={4} alignItems="start">
        <Box>
          <ErrorIcon mt={2} color="red" fontSize={'4xl'} />
        </Box>
        <VStack
          flex={'80%'}
          spacing={2}
          alignItems="start"
          justifyItems={'start'}
        >
          <Text fontSize={'xl'} fontWeight={'bold'} color="red">
            {title}
          </Text>
          <Text>{description}</Text>
          <HStack justifyContent={'end'} w="full">
            <Button size="sm" onClick={() => onClose?.()}>
              Aceptar
            </Button>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export const ErrorModal = () => {
  const { isOpen, info } = useDialogs((state) => state.errorsModal);

  return (
    <Modal isOpen={isOpen} onClose={info.onClose} isCentered id="confirmModal">
      <ModalOverlay />
      <ModalContent
        px="7"
        py="5"
        borderWidth={'0.5px'}
        borderColor="gray.300"
        borderRadius={'8'}
        maxWidth="362px"
        bg="white"
      >
        {isOpen && (
          <ErrorContentModal
            title={info.title}
            description={info.description}
            onClose={info.onClose}
          />
        )}
      </ModalContent>
    </Modal>
  );
};
