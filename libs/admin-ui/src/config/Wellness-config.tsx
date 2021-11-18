import { DeepPartialSimple } from '@wellness/common';

export type SidebarConfig = {
  items: {
    name: string;
  };
};

export type CloudinaryConfig = {
  cloudName: string;
  uploadPreset: string;
  apiKey: string;
};

export interface WellnessConfig {
  sidebar: SidebarConfig;
  cloudinary: CloudinaryConfig;
}

export type PartialWellnessConfig = DeepPartialSimple<WellnessConfig>;
