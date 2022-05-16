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
import { Ficha } from '@wellness/admin-ui/common';
import { DetailInfo } from '@wellness/admin-ui/ui';
import { ColTable, prepareCellProps, Table } from '@wellness/admin-ui/ui/table';
import { SafeAny } from '@wellness/common';
import format from 'date-fns/format';
import * as React from 'react';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useClientsStore } from '../../data/client-store';
import { CreateFicha } from './CreateFicha';
import { ViewFichaModal } from './ViewFicha';
import { useConfigFormats } from '@wellness/admin-ui/config';
SwiperCore.use([Autoplay]);

const { patch, selectFicha } = useClientsStore.getState();

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
      <HStack spacing={4}>
        <Link
          sx={linkStyles}
          onClick={() =>
            patch({
              modalCrudFicha: true,
              modeModalFicha: 'close',
              stateModalFicha: 'create',
            })
          }
        >
          Cerrar ficha
        </Link>
        <Box height="16px" width="3px" bg="gray.400" />
        <Link
          sx={linkStyles}
          onClick={() =>
            patch({
              modalCrudFicha: true,
              modeModalFicha: 'open',
              stateModalFicha: 'edit',
            })
          }
        >
          Editar ficha
        </Link>
        <Box height="16px" width="3px" bg="gray.400" />
        <Link sx={linkStyles} >Eliminar ficha</Link>
      </HStack>

      <Box width={'250px'}>
        <Swiper slidesPerView={1} autoplay={true} speed={1000}>
          {renderAssets()}
        </Swiper>
      </Box>
      <Text fontWeight="semibold" color="gray.400">
        {/* {format(new Date(ficha.createdAt), 'dd/MM/yyyy')} */}
      </Text>
      <VStack spacing={1} mt={4} align="start">
        <DetailInfo title="Peso" value={detail.weight + ''} />
        <DetailInfo
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

const _ListFichas = () => {
  const { fichas } = useClientsStore();
  const formats = useConfigFormats();

  return (
    <Box>
      {fichas && (
        <Table
          isSelecteable={false}
          data={fichas}
          rowProps={({ original }) => {
            return {
              _hover: {
                bg: 'gray.100',
                cursor: 'pointer',
              },
              onClick: () => {
                const ficha = original as Ficha;
                if (ficha.closed) {
                  selectFicha(ficha);
                }
              },
            };
          }}
        >
          <ColTable
            Header={'Abierto'}
            accessor="createdAt"
            Cell={(props: SafeAny) => {
              const { original } = prepareCellProps<Ficha>(props);
              return original?.createdAt
                ? format(new Date(original?.createdAt), formats.onlyDate)
                : formats.whenNotFoundInTable;
            }}
          />
          <ColTable
            Header={'Cerrado'}
            accessor="closedAt"
            Cell={(props: SafeAny) => {
              const { original } = prepareCellProps<Ficha>(props);
              return original?.closedAt
                ? format(new Date(original?.closedAt), formats.onlyDate)
                : formats.whenNotFoundInTable;
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
      <ViewFichaModal />
    </Box>
  );
};

const ListFichas = React.memo(_ListFichas);
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
