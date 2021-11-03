import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from '@wellness/core/entity';
import { Repository } from 'typeorm';
import { ClientInput } from '../dto/client.input';
import { normalizeEmailAddress } from '@wellness/common';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client) private readonly repository: Repository<Client>
  ) {}

  public async createClient(input: ClientInput) {
    input.email = normalizeEmailAddress(input.email);
    const client = new Client(input);
    // client has been saved
    const createdClient = this.repository.save(client);
    return createdClient;
  }
}
