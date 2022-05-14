import { Badge, Button, HStack } from '@chakra-ui/react';
import {
  Administrator,
  BaseLayout,
  ButtonIcon,
  ColTable,
  DeleteIcon,
  EditIcon,
  EyeIcon,
  Layout,
  NextPageWithLayout,
  prepareCellProps,
  rolMapper,
  Table,
} from '@wellness/admin-ui';
import { ChangePasswordModalFromAdmin } from '../components';
import { SafeAny } from '@wellness/common';
import { CreateAdminModal } from '../components';
import { useAdministratorInit } from '../controllers';
import { useAdministratorCrud } from '../data';

export const ListAdmins: NextPageWithLayout = () => {
  const { openModal, openEditModal } = useAdministratorCrud();
  const { administrators, isLoading } = useAdministratorInit();


  return (
    <Layout
      backText="Administradores"
      actions={
        <>
          <Button
            onClick={() => {
              openModal();
            }}
          >
            nuevo
          </Button>
        </>
      }
    >
      <Table
        data={administrators}
        rowProps={() => ({
          sx: {
            _hover: {
              cursor: 'pointer',
              bg: 'gray.100',
            },
          },
        })}
        variant="simple"
        size="sm"
        mt={8}
        isLoading={isLoading}
        isSelecteable={false}
      >
        <ColTable accessor="name" Header="Nombre" />
        <ColTable accessor="lastName" Header="Apellido" />
        <ColTable accessor="email" Header="Email" />
        <ColTable
          accessor="rol"
          Header={'Rol'}
          Cell={(props: SafeAny) => {
            const { original } = prepareCellProps<Administrator>(props);
            return <Badge>{rolMapper[original.rol]}</Badge>;
          }}
        />
        <ColTable
          id="actions"
          Header={'Acciones'}
          Cell={(props: SafeAny) => {
            const { original } = prepareCellProps<Administrator>(props);
            return (
              <HStack>
                <ButtonIcon
                  bg="brown.300"
                  onClick={() => {
                    openEditModal(original);
                  }}
                >
                  <EditIcon />
                </ButtonIcon>
                <ButtonIcon
                  bg="red"
                  onClick={() => {
                    openEditModal(original);
                  }}
                >
                  <DeleteIcon />
                </ButtonIcon>
              </HStack>
            );
          }}
        />
      </Table>
    </Layout>
  );
};

ListAdmins.getLayout = (page) => {
  return (
    <BaseLayout>
      {page}
      <CreateAdminModal />
      <ChangePasswordModalFromAdmin />
    </BaseLayout>
  );
};
