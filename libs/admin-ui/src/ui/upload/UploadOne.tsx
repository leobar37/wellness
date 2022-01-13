import { ImageUpload } from './Upload';
import { ImageUploadProps } from './types';
import { useField } from 'formik';
import { FC } from 'react';
/**
 * This is a integration with formik
 */
type UploadOneProps = {
  name: string;
} & Omit<ImageUploadProps, 'onFile'>;

export const UploadOne: FC<UploadOneProps> = ({ name, ...extraProps }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <ImageUpload
      onFile={({ source, isArray }) => {
        if (!isArray) {
          helpers.setValue(source);
        }
      }}
      image={meta.value}
      {...extraProps}
    />
  );
};
