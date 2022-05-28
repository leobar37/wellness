import { Box, HStack, useToken, Skeleton, useInterval } from '@chakra-ui/react';
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
import { ChackraForm, TypeDataEnum } from '@wellness/admin-ui';
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
const GraphicSkeleton = () => {
  return <Skeleton height={200} borderRadius="5px" width="450px" mx="auto" />;
};
export type GraphicProps = {
  results: GrowthType[];
};

const Graphic: FC<GraphicProps> = ({ results }) => {
  const [red100, blue200] = useToken('color', ['red.100', 'blue.600']);
  const labels = (results ?? []).map(({ label }) => label);
  const { growthFilters } = useDashboardStore();
  const data = (results ?? []).map(({ value }) => value);

  const mapper = {
    [TypeDataEnum.asistences]: 'Asistencias',
    [TypeDataEnum.plans]: 'Planes',
    [TypeDataEnum.register_clients]: 'Clientes registrados',
  };

  return (
    <Box mt={2}>
      <Line
        datasetIdKey="line"
        options={{
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0,
              },
            },
          },
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Gráfico de crecimiento',
            },
          },
        }}
        data={{
          labels: labels,
          datasets: [
            {
              label: mapper[growthFilters.typeData],
              data: data,
              fill: false,
              borderColor: red100,
              tension: 0.5,
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
    if (values.interval && values.typeData) {
      patch((prevState) => {
        prevState.growthFilters.interval = values.interval;
        prevState.growthFilters.typeData = values.typeData;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values?.interval, values?.typeData]);
  return (
    <ChackraForm>
      <HStack px={10} spacing={'16'}>
        <SelectControl name="interval" label="Intervalo:">
          <option value={IntervalTimeEnum.LAST_WEEK}>Última semana </option>
          <option value={IntervalTimeEnum.LAST_MONTH}>Última mes </option>
          <option value={IntervalTimeEnum.LAST_YEAR}>Última año </option>
        </SelectControl>
        <SelectControl name="typeData" label="Tipo de dato:">
          <option value={TypeDataEnum.asistences}>Asistencias</option>
          <option value={TypeDataEnum.plans}>Planes</option>
          <option value={TypeDataEnum.register_clients}>
            Clientes registrados
          </option>
        </SelectControl>
      </HStack>
    </ChackraForm>
  );
};

export const GrowthWidget: FC = () => {
  const { growthFilters } = useDashboardStore();
  const { data, loading, error, refetch } = useGrowthReportQuery({
    variables: {
      input: {
        interval: growthFilters.interval as SafeAny,
        typeData: growthFilters.typeData as SafeAny,
      },
    },
  });

  useInterval(() => {
    refetch();
  }, 1000 * 60 * 5);

  return (
    <Box flex={'45%'} maxWidth="500px">
      {!loading && !error && <Graphic results={data?.growthReport} />}
      {loading && <GraphicSkeleton />}
      <Formik
        initialValues={{
          interval: growthFilters.interval,
          typeData: growthFilters.typeData,
        }}
        onSubmit={noop}
      >
        <WidgetForm />
      </Formik>
    </Box>
  );
};
