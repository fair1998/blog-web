"use client";

import BlogCard from "@/components/blog-card";
import { PostFormDialog } from "@/components/blog/post-form-dialog";
import { Button } from "@/components/ui/button";
import { nanoid } from "nanoid";
import { useState } from "react";
import { BlogFormData } from "./form-dialog";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  public: boolean;
}

const generateInitialPosts = (): BlogPost[] => {
  const posts: BlogPost[] = [];
  for (let i = 1; i <= 5; i++) {
    posts.push({
      id: nanoid(),
      title: `Blog 000${i}`,
      description: "Lorem ipsum dolor sit amet.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto odio facilis earum veritatis ipsum, repellendus delectus nemo ad blanditiis nesciunt temporibus quae iure aliquid soluta ipsam. Odio tempore rem adipisci! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto odio facilis earum veritatis ipsum, repellendus delectus nemo ad blanditiis nesciunt temporibus quae iure aliquid soluta ipsam. Odio tempore rem adipisci! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto odio facilis earum veritatis ipsum, repellendus delectus nemo ad blanditiis nesciunt temporibus quae iure aliquid soluta ipsam. Odio tempore rem adipisci! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto odio facilis earum veritatis ipsum, repellendus delectus nemo ad blanditiis nesciunt temporibus quae iure aliquid soluta ipsam. Odio tempore rem adipisci! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto odio facilis earum veritatis ipsum, repellendus delectus nemo ad blanditiis nesciunt temporibus quae iure aliquid soluta ipsam. Odio tempore rem adipisci! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto odio facilis earum veritatis ipsum, repellendus delectus nemo ad blanditiis nesciunt temporibus quae iure aliquid soluta ipsam. Odio tempore rem adipisci! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto odio facilis earum veritatis ipsum, repellendus delectus nemo ad blanditiis nesciunt temporibus quae iure aliquid soluta ipsam. Odio tempore rem adipisci!",
      public: i % 2 === 0,
    });
  }
  return posts;
};

export default function HomePage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(
    generateInitialPosts()
  );
  const [dialogOpen, setDialogOpen] = useState<{
    open: boolean;
    data: BlogPost | undefined;
  }>({
    open: false,
    data: undefined,
  });

  console.log("blogPosts :>> ", blogPosts);

  const handleToggleFormDialog = () => {
    setDialogOpen((prev) => ({ ...prev, open: !prev.open, data: undefined }));
  };

  const handleEditPost = (index: number) => {
    setDialogOpen({
      open: true,
      data: blogPosts[index],
    });
  };

  const handleDeletePost = (index: number) => {
    const updatedPosts = blogPosts.filter((_, i) => i !== index);
    setBlogPosts(updatedPosts);
  };

  const createPost = (data: BlogFormData) => {
    return {
      id: nanoid(),
      title: data.title,
      description: data.description,
      content: data.content,
      public: data.public,
    };
  };

  const editPost = (id: string, data: BlogFormData) => {
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

  const handleSubmitPost = async (data: BlogFormData) => {
    if (dialogOpen.data) {
      const updatedPosts = editPost(dialogOpen.data.id, data);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setBlogPosts(updatedPosts);
    } else {
      const newPost = createPost(data);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setBlogPosts((prevPosts) => [newPost, ...prevPosts]);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Blog management</h1>
        <Button onClick={handleToggleFormDialog}>New Post</Button>
      </div>

      <div className="flex flex-col gap-4">
        {blogPosts.map((post, index) => (
          <BlogCard
            key={post.id}
            title={post.title}
            description={post.description}
            content={post.content}
            isPublic={post.public}
            onEdit={() => handleEditPost(index)}
            onDelete={() => handleDeletePost(index)}
          />
        ))}
      </div>

      <PostFormDialog
        open={dialogOpen.open}
        data={dialogOpen.data}
        onSubmit={handleSubmitPost}
        onClose={handleToggleFormDialog}
      />
    </div>
  );
}
