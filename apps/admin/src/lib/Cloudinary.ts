// see https://github.com/chickenLeobar/storeapp/blob/stagging/nimo/projects/shared/src/common/cloudinary/upload-cloudinary.service.ts
import { useGenerateSignatureMutation } from '@wellness/admin-ui/common';

const useCloudinaryApi = () => {
  const [mutatio, {}] = useGenerateSignatureMutation();
};
