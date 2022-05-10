import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BycriptService {
  salts!: number;
  constructor(private readonly configService: ConfigService) {
    this.salts = Number(this.configService.get<number>('BCRYPT_SALTS') || 11);
  }
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.salts);
    return bcrypt.hash(password, salt);
  }
  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
