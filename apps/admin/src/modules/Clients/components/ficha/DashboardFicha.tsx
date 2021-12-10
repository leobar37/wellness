import {
  Box,
  Button,
  Center,
  HStack,
  Img,
  Link,
  SystemStyleObject,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import { TabContent } from '@wellness/admin-ui';
import { matVa } from '@wellness/admin-ui/utils';
import * as React from 'react';
import { useClientsStore } from '../../data/client-store';
import { CreateFicha } from './CreateFicha';

const { patch } = useClientsStore.getState();

type DetailProps = {
  title: string;
  value: string;
  direction?: 'horizontal' | 'vertical';
};
const Detail = ({ title, value, direction = 'horizontal' }: DetailProps) => {
  const stylesDetail: SystemStyleObject = matVa<
    SystemStyleObject,
    DetailProps['direction']
  >(direction)({
    vertical: {
      flexDirection: 'column',
      alignItems: 'start',
      margin: '0',
    },
  });
  return (
    <HStack fontSize="sm" sx={stylesDetail}>
      <Text fontWeight="bold">{title}:</Text>
      <Text>{value}</Text>
    </HStack>
  );
};

const FichaPreview = () => {
  const linkStyles: SystemStyleObject = {
    color: 'gray.500',
    fontSize: 'sm',
  };
  return (
    <VStack align="start" maxWidth="450px">
      <HStack spacing={4}>
        <Link
          sx={linkStyles}
          onClick={() =>
            patch({ modalCrudFicha: true, modeModalFicha: 'close' })
          }
        >
          Cerrar ficha
        </Link>
        <Box height="16px" width="3px" bg="gray.400" />
        <Link sx={linkStyles}>Editar ficha</Link>
        <Box height="16px" width="3px" bg="gray.400" />
        <Link sx={linkStyles}>Eliminar ficha</Link>
      </HStack>
      <Img src="/temp/she.png" objectFit="cover" width="350px" />
      <Text fontWeight="semibold" color="gray.400">
        10/20/30
      </Text>
      <VStack spacing={1} mt={4} align="start">
        <Detail title="Peso" value="78kg" />
        <Detail title="Talla" value="110cm" />
        <Detail
          direction="vertical"
          title="Objetivo"
          value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque egestas..."
        />
      </VStack>
    </VStack>
  );
};
const NonFichaPreview = () => {
  return (
    <Center flexDirection="column" m="10" width="100%">
      <Text>Este usuario no tiene una ficha activa</Text>
      <Button
        my="4"
        onClick={() =>
          patch({
            modeModalFicha: 'open',
            modalCrudFicha: true,
          })
        }
      >
        Agregar
      </Button>
    </Center>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-types
type DashboardFichaProps = {};

export const DashboardFicha: React.FunctionComponent<DashboardFichaProps> =
  () => {
    return (
      <>
        <Box display="flex" justifyContent="space-between">
          <Tabs maxW="800px">
            <TabList>
              <Tab>Ficha</Tab>
              <Tab>Listado de fichas</Tab>
            </TabList>
            <TabPanels>
              <TabContent>
                {/* <FichaPreview /> */}
                <NonFichaPreview />
              </TabContent>
            </TabPanels>
          </Tabs>
        </Box>
        <CreateFicha mode="open" />
      </>
    );
  };
