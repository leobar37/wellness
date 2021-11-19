import { DeepPartialSimple } from '@wellness/common';

export type SidebarConfig = {
  items: {
    name: string;
  };
};

export type UploadImageConfig = {
  // the default width of the componente
  width: number;
  height: number;
};

export type CloudinaryConfig = {
  cloudName: string;
  uploadPreset: string;
  apiKey: string;
};

export interface WellnessConfig {
  sidebar: SidebarConfig;
  cloudinary: CloudinaryConfig;
  uploadImage: UploadImageConfig;
}

export type PartialWellnessConfig = DeepPartialSimple<WellnessConfig>;
