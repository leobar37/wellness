import { ModalCrud } from '@wellness/admin-ui';
import { Formik } from 'formik';
import { useDisclosure, HStack, Button } from '@chakra-ui/react';
import { InputControl, SelectControl } from 'formik-chakra-ui';

export const CreateAdminModal = () => {
  const { isOpen, onClose } = useDisclosure({
    isOpen: true,
  });
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      {() => {
        return (
          <ModalCrud
            isOpen={isOpen}
            onClose={onClose}
            textHeader="Crear Usuario"
            footer={
              <>
                <HStack>
                  <Button>Crear</Button>
                </HStack>
              </>
            }
          >
            <InputControl name="email" label="Email" />
            <SelectControl name="rol" label="Rol">
              <option
                value="
               "
              >
                Empleado
              </option>
              <option>Admin</option>
            </SelectControl>
          </ModalCrud>
        );
      }}
    </Formik>
  );
};
