import { BoxProps } from '@chakra-ui/react';
import { ReactElement } from 'react';

export type ImageUploadProps = {
  preview?: boolean;
  /** allow multiples images; by default is false */
  multiples?: boolean;
  image?: string;
  /**
   * placeholder image
   */
  placeHolderElment?: () => ReactElement;
  onFile: <T extends boolean>(options: {
    source: T extends true ? MFile[] : MFile;
    isArray: T;
  }) => void;
} & BoxProps;

export type MFile =
  | ({
      preview: string;
    } & File)
  | string;
