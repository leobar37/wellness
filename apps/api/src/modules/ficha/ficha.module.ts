import { Module } from '@nestjs/common';
import { FichaService } from './services/ficha.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ficha, DetailFicha } from '@wellness/core/entity';

@Module({
  providers: [FichaService],
  imports: [TypeOrmModule.forFeature([DetailFicha, Ficha])],
})
export class FichaModule {}
