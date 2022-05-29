import { ConfigService } from '@nestjs/config';
import { Provider, applyDecorators, Inject } from '@nestjs/common';
import { v2 } from 'cloudinary';
import { SafeAny } from '@wellness/common';
export const CLOUDINARY = 'Cloudinary';
export type Cloudinary = typeof v2;

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (configService: ConfigService) => {
    const config = getCloudinaryConfig(configService);
    v2.config({
      cloud_name: config.cloudName,
      api_key: config.api_key,
      api_secret: config.api_secret,
    });
    return v2;
  },
  inject: [ConfigService],
} as Provider;

export function InjectCloudinary(): SafeAny {
  return applyDecorators(Inject(CLOUDINARY));
}
export const getCloudinaryConfig = (configService: ConfigService) => {
  const cloudName = configService.get('CLOUDINARY_CLOUD_NAME');
  const api_key = configService.get('CLOUDINARY_API_KEY');
  const api_secret = configService.get('CLOUDINARY_API_SECRET');
  const preset = configService.get('CLOUDINARY_PRESET', 'ml_default');
  return {
    cloudName,
    api_key,
    api_secret,
    preset,
  };
};
