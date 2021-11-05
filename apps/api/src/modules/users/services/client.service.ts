import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from '@wellness/core/entity';
import { Repository } from 'typeorm';
import { ClientInput } from '../dto/client.input';
import { CRUD, ID, normalizeEmailAddress } from '@wellness/common';
import { EntityNotFoundError } from '@wellness/core/common/error';
import { EventBus, ClientEvent } from '@wellness/core/event-bus';
@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client) private readonly repository: Repository<Client>,
    private eventBus: EventBus
  ) {}

  public async createClient(input: ClientInput) {
    input.email = normalizeEmailAddress(input.email);
    const client = new Client(input);
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
  /**
   * TODO:
   * - Filters per date
   * - FIlters for name
   */
  public async findAll() {
    return this.repository.find({});
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
    const deleteResult = await this.repository.update(id, client);

    this.eventBus.publish(
      new ClientEvent({
        source: client,
        operation: CRUD.UPDATE,
      })
    );

    return client;
  }
}
