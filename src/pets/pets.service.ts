import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Pet, PetType } from '@prisma/client';

@Injectable()
export class PetsService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters: {
    type?: PetType;
    breed?: string;
    name?: string;
    ownerId?: number;
  }): Promise<Pet[]> {
    const { type, breed, name, ownerId } = filters;

    if (type && !Object.values(PetType).includes(type)) {
      throw new BadRequestException(
        `Pet type '${type}' is not a valid type. Valid types: ${Object.values(PetType)}`,
      );
    }

    return this.prisma.pet.findMany({
      where: {
        ...(type && { type: { equals: type } }),
        ...(breed && { breed: { contains: breed } }),
        ...(name && { name: { contains: name } }),
        ...(ownerId && { ownerId }),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
