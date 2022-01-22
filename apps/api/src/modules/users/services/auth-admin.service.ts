import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class AuthAdmin {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  //   login() {}
  // https://www.youtube.com/watch?v=Tj59gcgYOdg&ab_channel=MichaelGuay
}
