import { WellnessConfig } from './Wellness-config';
import { Dumbell, UsersIcon, Settings } from '../icons';
import { Role } from '../common';
import { DashboardIcon } from '../icons';

export const defaultConfig: WellnessConfig = {
  sidebar: {
    items: [
      {
        name: 'Dashboard',
        path: '/app',
        rol: [Role.ADMIN, Role.STAFF],
        icon: <DashboardIcon fontSize={'xl'} />,
      },
      {
        name: 'Clientes',
        path: '/app/clients',
        rol: [Role.STAFF, Role.ADMIN],
        icon: <UsersIcon fontSize="xl" />,
      },
      {
        name: 'Servicios',
        icon: <Dumbell fontSize="xl" />,
        rol: [Role.STAFF, Role.ADMIN],
        path: '',
        subItems: [
          {
            name: 'Planes',
            path: '/app/services/plans',
            rol: [Role.STAFF, Role.ADMIN],
          },
          {
            name: 'Actividades',
            path: '/app/services/activities',
            rol: [Role.STAFF, Role.ADMIN],
          },
        ],
      },
      {
        name: 'Configuraciones',
        icon: <Settings fontSize={'xl'} />,
        rol: [Role.ADMIN],
        subItems: [
          {
            rol: [Role.ADMIN],
            name: 'Administradores',
            path: '/app/admin',
          },
        ],
      },
    ],
  },
  cloudinary: {
    apiKey: '827568399999768',
    cloudName: 'wellnesspro',
    uploadPreset: 'ml_default',
  },
  formats: {
    onlyDate: 'dd/MM/yyyy',
    whenNotFoundInTable: '---',
  },
  uploadImage: {
    height: 150,
    width: 150,
    maxFiles: 10,
  },
  tableConfig: {
    gloabalFilter: {
      debounce: 250,
      placeHolder: (count) => `Buscar en ${count} resultados`,
    },
  },
  enviroment: {
    notFoundImage: {
      profile: '/img/not_found_image_profile.png',
    },
  },
};
