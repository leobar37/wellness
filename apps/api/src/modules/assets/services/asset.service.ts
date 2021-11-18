import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '@wellness/core';
@Injectable()
export class AssetService {
  constructor(private cloudinary: CloudinaryService) {}

  generateSignature(options: { public_id?: string }) {
    return this.cloudinary.generateSignature(options);
  }

  public deleteFile(public_id: string) {
    return this.cloudinary.deleteFile(public_id);
  }
}
