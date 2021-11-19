import { WellnessConfig } from './Wellness-config';

export const defaultConfig: WellnessConfig = {
  sidebar: {
    items: {
      name: '',
    },
  },
  cloudinary: {
    apiKey: '',
    cloudName: '',
    uploadPreset: '',
  },
  uploadImage: {
    height: 130,
    width: 130,
  },
};
