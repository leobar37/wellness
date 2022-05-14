import {
  Box,
  FormControl,
  Heading,
  HStack,
  List,
  Select,
  Skeleton,
  Stack
} from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import { ItemAlert } from './ItemAlert';
import { useAlertsReportQuery, TypeDataAlertEnum } from '@wellness/admin-ui';
import {  useDashboardStore } from "../../data";

const ListSkeleton = () => {
   const skeletons = Array(5).fill(0).map((_ , idx) => <Skeleton key={idx} height="40px" />);
  return <Stack mt={4}>
       {skeletons}
  </Stack>
}

export const AlertsWidget: FC = () => {
  const { typeData} = useDashboardStore(state => state.alertsFilter)
  const patch = useDashboardStore(state => state.patch);

  const { data, loading } = useAlertsReportQuery({
    variables: {
      input: {
        typeData: typeData,
      },
    },
  });
  // TODO: add skeleton here
  const renderResults = useMemo(() => {
    return (data?.alertsReport ?? []).map((item, idx) => (
      <ItemAlert key={idx} content={item} />
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);


  return (
    <Box
      mt={14}
      p={4}
      borderColor="blackAlpha.400"
      borderWidth="1px"
      borderRadius={'15px'}
      flex={'40%'}
      maxWidth={'400px'}
    >
      <HStack justifyContent={'space-between'}>
        <Heading size="md">Alertas:</Heading>
        <FormControl maxWidth={'200px'}>
          <Select onChange={val => {
            patch(state => {
              state.alertsFilter.typeData = val.target.value as TypeDataAlertEnum;
            })
          }}>
            <option value={TypeDataAlertEnum.birthday}>Cumpleaños</option>
            <option value={TypeDataAlertEnum.plans_to_overcome}>Planes</option>
          </Select>
        </FormControl>
      </HStack>
      {loading &&  <ListSkeleton /> }
       {!loading && <List spacing={6} overflowY="scroll" maxHeight={'350px'} mt={5}>
        {renderResults}
      </List>} 
    </Box>
  );
};
