import { defaultConfig } from './defaultConfig';
import { PartialWellnessConfig, WellnessConfig } from './Wellness-config';
import { mergeConfig } from './mergeConfig';
import { Paths } from '@wellness/common';
import { get } from 'lodash';

let activeConfig = defaultConfig;

export const setConfig = (userConfig: PartialWellnessConfig) => {
  activeConfig = mergeConfig(activeConfig, userConfig);
};

export const getConfig = <T extends unknown>(
  path?: Paths<typeof activeConfig>
) => {
  if (!path) {
    return activeConfig;
  }
  return get(activeConfig, path) as Readonly<T>;
};

export const useConfigApi = () => {
  return { getConfig, setConfig };
};

export const useConfig = <T extends unknown>(
  path?: Paths<typeof activeConfig>
): T => {
  return getConfig(path) as unknown as T;
};
