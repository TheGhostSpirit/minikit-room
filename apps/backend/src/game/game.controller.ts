import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { GameService } from './game.service';
import { Game } from './game.entity';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  create(@Body() game: Game): Promise<Game> {
    return this.gameService.create(game);
  }

  @Get()
  findAll(): Promise<Game[]> {
    return this.gameService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Game> {
    return this.gameService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() game: Game): Promise<Game> {
    return this.gameService.update(id, game);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.gameService.remove(id);
  }
}