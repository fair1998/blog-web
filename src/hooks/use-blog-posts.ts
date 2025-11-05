import { generateInitialPosts } from "@/lib/utils/blog";
import { PostFormData } from "@/lib/validators/post.schema";
import { BlogPost } from "@/types/blog";
import { nanoid } from "nanoid";
import { useState } from "react";

export function useBlogPosts() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(
    generateInitialPosts()
  );

  const createPost = (data: PostFormData): BlogPost => {
    return {
      id: nanoid(),
      title: data.title,
      description: data.description,
      content: data.content,
      public: data.public,
    };
  };

  const updatePost = (id: string, data: PostFormData) => {
    return blogPosts.map((post) =>
      post.id === id
        ? {
            ...post,
            title: data.title,
            description: data.description,
            content: data.content,
            public: data.public,
          }
        : post
    );
  };

  const submitPost = async (values: PostFormData, postIdToEdit?: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (postIdToEdit) {
      const updatedPost = updatePost(postIdToEdit, values);
      setBlogPosts(updatedPost);
    } else {
      const newPost = createPost(values);
      setBlogPosts((prevPosts) => [newPost, ...prevPosts]);
    }
  };

  const deletePost = (id: string) => {
    setBlogPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  return {
    blogPosts,
    setBlogPosts,
    createPost,
    updatePost,
    deletePost,
    submitPost,
  };
}
