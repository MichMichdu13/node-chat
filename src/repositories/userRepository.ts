import { prisma } from './prisma';

export function findUserByEmail(email: string) {
  return prisma.user.findUnique({where: {email}})
}

export function findUserById(id: string) {
  if (!id) {
    return null;
  }
  return prisma.user.findUnique({where: {id}})
}

export function createUser(email: string, name: string){
  const user = prisma.user.create({
    data: {email, name}
  })
  return user;
}

export function updateUser(id: string, data: Record<string, string>){
  return prisma.user.update({
    where: {id},
    data
  });
}

export function deleteUser(id: string){
  return prisma.user.delete({where: {id}});
}