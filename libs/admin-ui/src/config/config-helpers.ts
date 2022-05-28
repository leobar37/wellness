import { get } from 'lodash';
import { defaultConfig } from './defaultConfig';
import { mergeConfig } from './mergeConfig';
import { PartialWellnessConfig } from './Wellness-config';

let activeConfig = defaultConfig;

export const setConfig = (userConfig: PartialWellnessConfig) => {
  activeConfig = mergeConfig(activeConfig, userConfig);
};

export const getConfig = <T extends unknown>(path?: string) => {
  if (!path) {
    return activeConfig;
  }
  return get(activeConfig, path) as Readonly<T>;
};

export const useConfigApi = () => {
  return { getConfig, setConfig };
};

export const useConfig = <T extends unknown>(path?: string): T => {
  return getConfig(path) as unknown as T;
};

export const useConfigFormats = () => {
  return activeConfig.formats;
};

// selector
export const useEnviroment = () => {
  return activeConfig.enviroment;
};
