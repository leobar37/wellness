import { CloudinaryProvider } from './Cloudinary.provider';
import { Module } from '@nestjs/common';

@Module({
  providers: [CloudinaryProvider],
})
export class CloudinaryModule {}
