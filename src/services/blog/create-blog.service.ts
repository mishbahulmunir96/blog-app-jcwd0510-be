import { Blog } from "@prisma/client";
import prisma from "../../lib/prisma";
import { cloudinaryUpload } from "../../lib/cloudinary";

interface createBlogBody {
  title: string;
  description: string;
  content: string;
  category: string;
}

export const createBlogService = async (
  body: createBlogBody,
  thumbnail: Express.Multer.File,
  userId: number
) => {
  try {
    const { title, category, content, description } = body;

    const blog = await prisma.blog.findFirst({
      where: { title },
    });

    if (blog) {
      throw new Error("Title already in use");
    }

    const { secure_url } = await cloudinaryUpload(thumbnail);

    return await prisma.blog.create({
      data: {
        ...body,
        thumbnail: secure_url,
        userId: userId,
      },
    });
  } catch (error) {
    throw error;
  }
};
