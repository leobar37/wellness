import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from '@wellness/core/entity';
import { Repository } from 'typeorm';
import { ClientInput } from '../dto/client.input';
import { CRUD, ID, normalizeEmailAddress } from '@wellness/common';
import { EntityNotFoundError } from '@wellness/core/common/error';
import { EventBus, ClientEvent } from '@wellness/core/event-bus';
import * as faker from 'faker';

const temporalId = () => {
  return faker.lorem.word(3) + faker.datatype.number(10);
};

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client) private readonly repository: Repository<Client>,
    private eventBus: EventBus
  ) {}

  public async createClient(input: ClientInput) {
    input.email = normalizeEmailAddress(input.email);
    if (!input.code) {
      input.code = temporalId();
    }

    const client = new Client(input);
    client.birth = input.birthday;
    // client has been saved
    const createdClient = await this.repository.save(client);
    this.eventBus.publish(
      new ClientEvent({
        source: createdClient,
        operation: CRUD.CREATE,
      })
    );
    return createdClient;
  }

  public async findAll() {
    return this.repository.find({
      order: {
        createdAt: 'ASC',
      },
    });
  }

  public async findOne(id: ID) {
    return this.repository.findOne(id);
  }

  public async delete(id: ID) {
    const clientFound = await this.existCLient(id);
    await this.repository.delete(id);
    this.eventBus.publish(
      new ClientEvent({
        source: clientFound,
        operation: CRUD.DELETE,
      })
    );
    return clientFound;
  }

  private async existCLient(id: ID) {
    const clientFound = await this.repository.findOne(id);
    if (!clientFound) {
      throw new EntityNotFoundError('Client', clientFound.id);
    }
    return clientFound;
  }

  public async update(id: ID, input: ClientInput) {
    const user = await this.existCLient(id);
    const client = this.repository.merge(user, input);
    await this.repository.update(id, client);
    this.eventBus.publish(
      new ClientEvent({
        source: client,
        operation: CRUD.UPDATE,
      })
    );
    return client;
  }
}
