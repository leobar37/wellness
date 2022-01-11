import { Box, HStack, Portal, Text } from '@chakra-ui/react';
import { ButtonIcon, ProgressBadge, Price } from '@wellness/admin-ui';
import { useContractModal } from '../../data';
export const ServicesSection = () => {
  const { openModal } = useContractModal();

  return (
    <Box width={'700px'}>
      <HStack justify={'space-between'}>
        <ProgressBadge
          title="Plan"
          progress={50}
          subtitle={'10/50/50'}
          value={
            <Text color={'white'}>
              <Price>{10}</Price>
            </Text>
          }
        />
        <ButtonIcon onClick={() => openModal()}>+</ButtonIcon>
      </HStack>
    </Box>
  );
};
