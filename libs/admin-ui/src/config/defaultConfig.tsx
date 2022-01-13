import { WellnessConfig } from './Wellness-config';
import { Dumbell, UsersIcon } from '../icons';

export const defaultConfig: WellnessConfig = {
  sidebar: {
    items: [
      {
        name: 'Clientes',
        path: '/app/clients',
        icon: <UsersIcon fontSize="xl" />,
      },
      {
        name: 'Servicios',
        icon: <Dumbell fontSize="xl" />,
        path: '',
        subItems: [
          {
            name: 'Planes',
            path: '/app/services/plans',
          },
          {
            name: 'Actividades',
            path: '/app/services/activities',
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
};
