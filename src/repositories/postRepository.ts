import { prisma } from "./prisma";

export function findAllPosts() {
  const posts = prisma.post.findMany({
    include: {
      user: true,
    },
    orderBy: { createdAt: 'asc' },
  })
  return posts;
}

export function createPost(userId: string, content: string){
  const post = prisma.post.create({
    data: {userId, content}
  })
  return post;
}

