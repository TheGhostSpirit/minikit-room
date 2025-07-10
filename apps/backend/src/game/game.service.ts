import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './game.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  async create(game: Game): Promise<Game> {
    return this.gameRepository.save(game);
  }

  async findAll(): Promise<Game[]> {
    return this.gameRepository.find();
  }

  async findOne(id: number): Promise<Game> {
    return this.gameRepository.findOneByOrFail({ id });
  }

  async update(id: number, game: Game): Promise<Game> {
    await this.gameRepository.update(id, game);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    return this.gameRepository.delete(id).then(() => {});
  }
}
