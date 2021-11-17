import { DeepPartialSimple } from '@wellness/common';

type SidebarConfig = {
  items: {
    name: string;
  };
};

export interface WellnessConfig {
  sidebar: SidebarConfig;
}

export type PartialWellnessConfig = DeepPartialSimple<WellnessConfig>;
