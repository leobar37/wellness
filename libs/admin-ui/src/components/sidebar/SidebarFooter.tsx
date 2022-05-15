import {
  Box,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from '@chakra-ui/react';
import { OutlineMore } from '../../icons';
import { useAuth } from '../../auth';
import { ButtonIcon } from '../../ui/button';
import { config } from './internal';
import { Exit, User } from '../../icons';
import { useRouter } from 'next/router';

export const SidebarFooter = () => {
  const { currentUser, logout, isLoggedIn } = useAuth();
  const router = useRouter();
  const exitOption = () => {
    router.push('/auth/login');
    logout();
  };

  const viewProfile = () => {
    router.push('/app/admin/profile');
  };

  const user = currentUser();

  if (!isLoggedIn || !user) {
    return null;
  }

  return (
    <Box position="absolute" bottom="10px" left="0">
      {/* Footer */}
      <HStack
        spacing="4"
        justifyContent={'space-between'}
        px="4"
        width={config.width}
        py={3}
        bg="blackAlpha.700"
      >
        <Box color="white">
          <VStack spacing={0} ml={3} align="start">
            <Text fontSize="sm">{user.name}</Text>
            <Text fontSize="sm" color="whiteAlpha.600">
              {user.lastName}
            </Text>
          </VStack>
        </Box>

        <Box>
          <Menu placement="top-start" offset={[150, 50]}>
            <MenuButton>
              <ButtonIcon fontSize={'3xl'}>
                <OutlineMore
                  color="white"
                  sx={{
                    transform: 'scale(1.6)',
                  }}
                />
              </ButtonIcon>
            </MenuButton>

            <MenuList>
              <MenuItem icon={<Exit />} onClick={() => exitOption()}>
                Salir
              </MenuItem>
              <MenuItem icon={<User />} onClick={() => viewProfile()}>
                Ver Perfil
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </HStack>
    </Box>
  );
};
