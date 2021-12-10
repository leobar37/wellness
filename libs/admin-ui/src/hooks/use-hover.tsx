/* eslint-disable @typescript-eslint/no-explicit-any */
import { debounce } from 'lodash';
import {
  useRef,
  useState,
  useEffect,
  MutableRefObject,
  useCallback,
} from 'react';
export const useHover = <T extends HTMLDivElement>(): [
  MutableRefObject<T>,
  boolean
] => {
  const [value, setValue] = useState<boolean>(false);
  const ref: any = useRef<T | null>(null);
  const handleMouseOver = useCallback(() => setValue(true), []);
  const handleMouseOut = useCallback(() => setValue(false), []);
  useEffect(
    () => {
      const node: T = ref.current;
      if (node) {
        node.addEventListener('mouseover', handleMouseOver);
        node.addEventListener('mouseout', handleMouseOut);
        return () => {
          node.removeEventListener('mouseover', handleMouseOver);
          node.removeEventListener('mouseout', handleMouseOut);
        };
      }
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {};
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ref.current] // Recall only if ref changes
  );

  return [ref, value];
};
