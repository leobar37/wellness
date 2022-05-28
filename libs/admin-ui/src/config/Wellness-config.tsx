import { DeepPartialSimple } from '@wellness/common';
import { Item } from '../components/sidebar';
export type SidebarConfig = {
  items: Item[];
};

export type UploadImageConfig = {
  // the default width of the componente
  width: number;
  height: number;
  maxFiles: number;
};

export type TableConfig = {
  gloabalFilter: {
    debounce: number;
    placeHolder: (count: number) => string;
  };
};

export type CloudinaryConfig = {
  cloudName: string;
  uploadPreset: string;
  apiKey: string;
};

export type FormatsConfig = {
  onlyDate: string;
  whenNotFoundInTable: string;
};

export type EnviromentConfig = {
  notFoundImage: {
    profile: string;
  };
};

export interface WellnessConfig {
  sidebar: SidebarConfig;
  cloudinary: CloudinaryConfig;
  uploadImage: UploadImageConfig;
  tableConfig: TableConfig;
  formats: FormatsConfig;
  enviroment: EnviromentConfig;
}

export type PartialWellnessConfig = DeepPartialSimple<WellnessConfig>;
