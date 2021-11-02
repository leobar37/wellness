import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      password: 'alfk3458',
      username: 'leobar37',
      type: 'postgres',
      host: 'localhost',
      port: 5432,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
