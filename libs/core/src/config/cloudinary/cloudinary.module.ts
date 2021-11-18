import { CloudinaryProvider } from './Cloudinary.provider';
import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  providers: [CloudinaryProvider, CloudinaryService],
  imports: [ConfigModule],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
