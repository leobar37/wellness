import {
  Box,
  Button,
  HStack,
  Img,
  Text,
  useToken,
  VStack,
} from '@chakra-ui/react';
/**
 * TODO:
 * - Move this to the client folder
 */

type BadgeDisplayProps = {
  title: string;
  value: string;
};

const BadgeDisplay = ({ title, value }: BadgeDisplayProps) => {
  const [blackAlpha300] = useToken('colors', ['blackAlpha.300']);
  return (
    <VStack
      align="start"
      justify="center"
      width="250px"
      height="90px"
      pl="4"
      borderRadius="sm"
      border={`1.5px solid ${blackAlpha300}`}
    >
      <Text fontWeight="bold">{title}</Text>
      <Text fontSize="sm" color="blackAlpha.600">
        {value}
      </Text>
    </VStack>
  );
};

export const DashboardClient = () => {
  return (
    <HStack width="100%" align="start" justify="space-around" spacing={'120px'}>
      <VStack spacing={5} align="start">
        <Button>Ficha actual</Button>
        <BadgeDisplay title={'Última asistencia'} value={'Hace 2 dias'} />
        <BadgeDisplay title={'Cumpleaños'} value={'10/12/12'} />
        <BadgeDisplay
          title={'Fecha de registro'}
          value={'Nos acompaña desde  el 16/20/12'}
        />
      </VStack>
      <VStack>
        <Img
          src="https://bit.ly/sage-adebayo"
          width="250px"
          borderRadius="2xl"
        />
        <Box
          width="280px"
          height="80px"
          borderRadius="10px"
          position="relative"
          zIndex={19}
          bg="#524C4C"
        >
          <Box
            px={4}
            position="absolute"
            height="100%"
            left="0"
            width="100%"
            top="0"
            borderRadius="10px"
            display="flex"
            zIndex={21}
            justifyContent="space-between"
            alignItems="center"
          >
            <Box color="white">
              <Text fontWeight="semibold">Plan:</Text>
              <Text fontSize="small">30/20/15</Text>
            </Box>
            <Text color="white">150 s/.</Text>
          </Box>
          <Box
            zIndex={20}
            position="absolute"
            height="100%"
            left="0"
            width="50%"
            top="0"
            bg="brown.500"
            borderRadius="10px"
          ></Box>
        </Box>
      </VStack>
    </HStack>
  );
};
