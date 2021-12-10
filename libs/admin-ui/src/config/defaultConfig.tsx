import { WellnessConfig } from './Wellness-config';

export const defaultConfig: WellnessConfig = {
  sidebar: {
    items: {
      name: '',
    },
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
