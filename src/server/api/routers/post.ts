import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
  newest: publicProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.post.findMany({
      where: {
        publishedAt: {
          not: null,
        },
        tags: {
          some: {
            title: {
              contains: "berita",
            },
          },
        },
      },
      orderBy: {
        publishedAt: "desc",
      },
      take: 5,
      include: {
        author: {
          select: {
            id: true,
            username: true,
            image: true,
            name: true,
          },
        },
        tags: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });

    console.log(res);
    return res;
  }),
});
