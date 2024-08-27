import { Controller, Get, Query } from '@nestjs/common';
import { PetsService } from './pets.service';
import { Pet, PetType } from '@prisma/client'; // Import your Pet and PetType types from Prisma

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get()
  async findAll(
    @Query('type') type?: PetType,
    @Query('breed') breed?: string,
    @Query('name') name?: string,
    @Query('ownerId') ownerId?: number,
  ): Promise<Pet[]> {
    return this.petsService.findAll({ type, breed, name, ownerId });
  }
}
