import {
  Modal,
  ModalOverlay,
  ModalCloseButton,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Text,
  useToken,
  useTheme,
  HStack,
  Button,
  FormControl,
  ModalBody,
  FormLabel,
  Input,
  ModalProps,
} from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { TextOrChild, ChildrenOrText } from '../children';

type ModalCrudProps = {
  overlay?: boolean;
  textHeader: TextOrChild;
  buttons?: {
    saveText: string;
    resetText: string;
  };
  onReset?: () => void;
  onSave?: () => void;
} & Pick<ModalProps, 'isOpen' | 'onClose' | 'isCentered' | 'motionPreset'>;

export const ModalCrud: FunctionComponent<ModalCrudProps> = ({
  children,
  overlay,
  textHeader,
  isOpen,
  onClose,
  isCentered,
  motionPreset,
  onReset,
  onSave,
  buttons,
}) => {
  const [gray500] = useToken('colors', ['gray.500']);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered={isCentered}
      motionPreset={motionPreset || 'slideInBottom'}
    >
      {overlay && <ModalOverlay />}
      <ModalContent
        position="relative"
        borderRadius="0"
        minWidth="650px"
        minHeight="500px"
      >
        <ModalCloseButton />
        <ModalHeader borderBottom={`5px solid ${gray500}`}>
          <ChildrenOrText
            onText={(val) => <Text fontWeight="semibold">{val}</Text>}
          >
            {textHeader}
          </ChildrenOrText>
        </ModalHeader>
        <ModalBody mx={4}>{children}</ModalBody>
        <ModalFooter w={'100%'} left="0" position="absolute" bottom="0">
          <HStack>
            <Button onClick={onReset} variant="ghost">
              {buttons?.resetText}
            </Button>
            <Button onClick={onSave}>{buttons?.saveText}</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

ModalCrud.defaultProps = {
  overlay: true,
  buttons: {
    resetText: 'Restablecer',
    saveText: 'Guardar cambios',
  },
};
