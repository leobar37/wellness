import {
  Badge,
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
import SwiperCore, { Autoplay } from 'swiper';
import * as React from 'react';
import { useClientsStore } from '../../data/client-store';
import { CreateFicha } from './CreateFicha';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Table, ColTable } from '@wellness/admin-ui/ui/table';
import format from 'date-fns/format';
SwiperCore.use([Autoplay]);
import {
  GlobalFilter,
  prepareCellProps,
  TableInstanceProps,
} from '@wellness/admin-ui/ui/table';
import { SafeAny } from '@wellness/common';
import { Ficha } from '@wellness/admin-ui/common';
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

const FichaPreview = ({ ficha }: { ficha: Ficha }) => {
  const linkStyles: SystemStyleObject = {
    color: 'gray.500',
    fontSize: 'sm',
  };

  const detail = ficha.details.find((detail) => detail.open);

  const renderAssets = () => {
    const assets = detail.asset.assets;
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
      {/* actions */}
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

      <Box width={'250px'}>
        <Swiper slidesPerView={1} autoplay={true} speed={1000}>
          {renderAssets()}
        </Swiper>
      </Box>
      <Text fontWeight="semibold" color="gray.400">
        10/20/30
      </Text>
      <VStack spacing={1} mt={4} align="start">
        <Detail title="Peso" value={detail.weight + ''} />
        <Detail
          direction="vertical"
          title="Objetivo"
          value={detail.objective}
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

const ListFichas = () => {
  const { fichas } = useClientsStore();

  return (
    <Box>
      {fichas && (
        <Table data={fichas}>
          <ColTable
            Header={'Abierto'}
            accessor="createdAt"
            Cell={(props: SafeAny) => {
              const { original } = prepareCellProps<Ficha>(props);
              return original.createdAt
                ? format(new Date(original.createdAt), 'dd/MM/yyyy:HH:mm')
                : '----';
            }}
          />
          <ColTable
            Header={'Cerrado'}
            accessor="closedAt"
            Cell={(props: SafeAny) => {
              const { original } = prepareCellProps<Ficha>(props);
              console.log(original);

              return original.closedAt
                ? format(new Date(original.closedAt), 'dd/MM/yyyy')
                : '----';
            }}
          />
          <ColTable
            Header={'Estado'}
            accessor="closed"
            Cell={(props: SafeAny) => {
              const { original } = prepareCellProps<Ficha>(props);
              return original.closed ? (
                <Badge>Cerrado</Badge>
              ) : (
                <Badge variant="solid" colorScheme={'yellow'}>
                  Activo
                </Badge>
              );
            }}
          />
        </Table>
      )}
    </Box>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-types
type DashboardFichaProps = {};

export const DashboardFicha: React.FunctionComponent<DashboardFichaProps> =
  () => {
    const { ficha, fichas } = useClientsStore();
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
                {ficha !== null ? (
                  <FichaPreview ficha={ficha} />
                ) : (
                  <NonFichaPreview />
                )}
              </TabContent>

              <TabContent>
                <ListFichas />
              </TabContent>
            </TabPanels>
          </Tabs>
        </Box>
        <CreateFicha mode="open" />
      </>
    );
  };
