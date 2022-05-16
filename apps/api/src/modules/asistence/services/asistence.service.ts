import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError } from '@wellness/core/common/error';
import { Asistence } from '@wellness/core/entity';
import { Repository } from 'typeorm';
import { InputAsistence } from '../dto/asistence.input';

@Injectable()
export class AsitenceService {
  constructor(
    @InjectRepository(Asistence) private repository: Repository<Asistence>
  ) {}
  // create asistence
  async createAsistence(input: InputAsistence) {
    const asistence = new Asistence(input);
    const asistenceSave = await this.repository.save(asistence);
    return asistenceSave;
  }

  async deleteAsistence(id: number) {
    const asistence = await this.existAsistence(id);
    await this.repository.delete(id);
    return asistence;
  }

  async findAsistences(idClient: number) {
    const asistences = await this.repository.find({
      where: {
        clientId: idClient,
      },
      order: {
        createdAt: 'ASC',
      },
    });
    return asistences;
  }

  private async existAsistence(id: number) {
    const asistence = await this.repository.findOne(id);
    if (!asistence) {
      new EntityNotFoundError('Asistence', asistence.id);
    }
    return asistence;
  }

  async updateAsistence(id: number, input: InputAsistence) {
    const asistence = await this.existAsistence(id);
    const asistencePrepared = this.repository.merge(asistence, input);
    await this.repository.update(id, asistencePrepared);
    return asistencePrepared;
  }
}
