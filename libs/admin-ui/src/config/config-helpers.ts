import { defaultConfig } from './defaultConfig';
import { PartialWellnessConfig, WellnessConfig } from './Wellness-config';
import { mergeConfig } from './mergeConfig';
import { Paths } from '@wellness/common';
import { get } from 'lodash';
let activeConfig = defaultConfig;

export const setConfig = (userConfig: PartialWellnessConfig) => {
  activeConfig = mergeConfig(activeConfig, userConfig);
};

export const getConfig = (
  path?: Paths<typeof activeConfig>
): Readonly<WellnessConfig> => {
  if (!path) {
    return activeConfig;
  }
  return get(activeConfig, path);
};

export const useConfigApi = () => {
  return { getConfig, setConfig };
};

export const useConfig = (path?: Paths<typeof activeConfig>) => {
  return getConfig(path);
};
