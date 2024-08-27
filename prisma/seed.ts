import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create users
  const user1 = await prisma.user.create({
    data: {
      name: 'Alice Smith',
      email: 'alice@example.com',
      password: 'hashedpassword1',
      AdoptionRequest: {
        create: [],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Bob Johnson',
      email: 'bob@example.com',
      password: 'hashedpassword2',
      AdoptionRequest: {
        create: [],
      },
    },
  });

  // Create pets
  const dog = await prisma.pet.create({
    data: {
      name: 'Rex',
      dob: new Date('2019-04-12'),
      type: 'DOG',
      breed: 'Labrador',
      owner: { connect: { id: user1.id } },
      DogDetails: {
        create: {
          size: 'LARGE',
          trained: true,
        },
      },
    },
  });

  const cat = await prisma.pet.create({
    data: {
      name: 'Whiskers',
      dob: new Date('2020-09-23'),
      type: 'CAT',
      breed: 'Siamese',
      owner: { connect: { id: user2.id } },
      CatDetails: {
        create: {
          indoor: true,
          declawed: false,
        },
      },
    },
  });

  const bird = await prisma.pet.create({
    data: {
      name: 'Tweety',
      dob: new Date('2018-06-18'),
      type: 'BIRD',
      breed: 'Canary',
      owner: { connect: { id: user2.id } },
      BirdDetails: {
        create: {
          wingspan: 12.5,
          talking: false,
        },
      },
    },
  });

  // Create adoption requests
  const adoptionRequest1 = await prisma.adoptionRequest.create({
    data: {
      requester: { connect: { id: user2.id } },
      pet: { connect: { id: dog.id } },
      description: 'I have always wanted a dog and Rex seems perfect.',
      hasOtherPets: true,
      pictures: {
        create: [{ url: 'https://example.com/request1.jpg' }],
      },
      status: 'PENDING',
    },
  });

  console.log({ user1, user2, dog, cat, bird, adoptionRequest1 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
