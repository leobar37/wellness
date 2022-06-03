import { Box, Tab, TabList, TabPanels, Tabs } from '@chakra-ui/react';
import { TabContent } from '@wellness/admin-ui';
import * as React from 'react';
import SwiperCore, { Autoplay } from 'swiper';
import { useClientsStore } from '../../data/client-store';
import { CreateFicha } from './CreateFicha';
import FichaPreview from './FichaPreview';
import ListFichas from './listFichas';
import NonFichaPreview from './NoFichaPreview';
import { isNull } from 'lodash';
import { useGetFicha } from '../../controller/use-ficha-controller';
SwiperCore.use([Autoplay]);

export const DashboardFicha: React.FC = () => {
  const { data: ficha } = useGetFicha();

  console.log(ficha);

  const fichaNode = !isNull(ficha) ? (
    <FichaPreview ficha={ficha} />
  ) : (
    <NonFichaPreview />
  );

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Tabs maxW="800px">
          <TabList>
            <Tab>Ficha</Tab>
            <Tab>Listado de fichas</Tab>
          </TabList>
          <TabPanels>
            <TabContent>{fichaNode}</TabContent>
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
