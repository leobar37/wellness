import { SafeAny } from '.';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

declare const File: SafeAny;

/**
 * Type-safe omit function - returns a new object which omits the specified keys.
 */
export function omit<T extends SafeAny, K extends keyof T>(
  obj: T,
  keysToOmit: K[]
): Omit<T, K>;
export function omit<T extends SafeAny | SafeAny[], K extends keyof T>(
  obj: T,
  keysToOmit: string[],
  recursive: boolean
): T;
export function omit<T extends SafeAny, K extends keyof T>(
  obj: T,
  keysToOmit: string[],
  recursive = false
): T {
  if ((recursive && !isObject(obj)) || isFileObject(obj)) {
    return obj;
  }

  if (recursive && Array.isArray(obj)) {
    return obj.map((item: SafeAny) =>
      omit(item, keysToOmit, true)
    ) as SafeAny as T;
  }

  return Object.keys(obj as SafeAny).reduce((output: SafeAny, key) => {
    if (keysToOmit.includes(key)) {
      return output;
    }
    if (recursive) {
      return {
        ...output,
        [key]: omit((obj as SafeAny)[key], keysToOmit, true),
      };
    }
    return { ...output, [key]: (obj as SafeAny)[key] };
  }, {} as Omit<T, K>);
}

function isObject(input: SafeAny): input is SafeAny {
  return typeof input === 'object' && input !== null;
}

/**
 * When running in the Node environment, there is no native File object.
 */
function isFileObject(input: SafeAny): boolean {
  if (typeof File === 'undefined') {
    return false;
  } else {
    return input instanceof File;
  }
}
