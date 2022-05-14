import { Box, HStack, useToken } from '@chakra-ui/react';
import {
  CategoryScale,
  Chart as ChartJs,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { FC } from 'react';
import { noop } from '@chakra-ui/utils';
import { Line } from 'react-chartjs-2';
import { Formik } from 'formik';
import { SelectControl } from 'formik-chakra-ui';
import { ChackraForm } from '@wellness/admin-ui';
import { useGrowthReportQuery, GrowthType } from '@wellness/admin-ui';
import { IntervalTimeEnum, SafeAny } from '@wellness/common';
import { useDashboardStore } from '../../data';
import { useEffect } from 'react';
import { useFormikContext } from 'formik';

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export type GraphicProps = {
  results: GrowthType[];
};
const Graphic: FC<GraphicProps> = ({ results }) => {
  const [red100, blue200] = useToken('color', ['red.100', 'blue.600']);

  const labels = (results ?? []).map(({ label }) => label);
  const data = (results ?? []).map(({ value }) => value);
  return (
    <Box mt={2}>
      <Line
        datasetIdKey="line"
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Charts js Line Chart',
            },
          },
        }}
        data={{
          labels: labels,
          datasets: [
            {
              label: 'Planes',
              data: data,
              fill: false,
              borderColor: red100,
              tension: 0.1,
            },
          ],
        }}
      />
    </Box>
  );
};

const WidgetForm: FC = () => {
  const { patch } = useDashboardStore();
  const { values } = useFormikContext<SafeAny>();
  useEffect(() => {
    if (values.interval) {
      patch((prevState) => {
        prevState.growthFilters.interval = values.interval;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values?.interval]);
  return (
    <ChackraForm>
      <HStack px={10} spacing={'16'}>
        <SelectControl name="interval" label="Intervalo:">
          <option value={IntervalTimeEnum.LAST_WEEK}>Última semana </option>
          <option value={IntervalTimeEnum.LAST_YEAR}>Última año </option>
        </SelectControl>
        <SelectControl name="name" label="Tipo de dato:">
          <option value={'opcion'}>Todos</option>
          <option value={'opcion'}>Planes vendidos</option>
        </SelectControl>
      </HStack>
    </ChackraForm>
  );
};

export const GrowthWidget: FC = () => {
  const { growthFilters } = useDashboardStore();
  const { data, loading, error } = useGrowthReportQuery({
    variables: {
      input: {
        interval: growthFilters.interval as SafeAny,
        typeData: growthFilters.typeData,
      },
    },
  });

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <Box flex={'45%'}>
      <Graphic results={data?.growthReport} />
      <Formik initialValues={{}} onSubmit={noop}>
        <WidgetForm />
      </Formik>
    </Box>
  );
};
