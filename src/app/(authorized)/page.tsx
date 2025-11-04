"use client";

import BlogCard from "@/components/blog-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

interface BlogPost {
  title: string;
  description: string;
  content: string;
  public: boolean;
}

const generateInitialPosts = (): BlogPost[] => {
  const posts: BlogPost[] = [];
  for (let i = 1; i <= 5; i++) {
    posts.push({
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

  const handleEdit = (index: number) => {
    // Handle edit action
    console.log("[handleEdit] index :>> ", index);
  };

  const handleDelete = (index: number) => {
    const updatedPosts = blogPosts.filter((_, i) => i !== index);
    setBlogPosts(updatedPosts);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Blog management</h1>
        <Link className="flex items-center gap-2" href="#">
          <Button>New Post</Button>
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {blogPosts.map((post, index) => (
          <BlogCard
            key={index}
            title={post.title}
            description={post.description}
            content={post.content}
            isPublic={post.public}
            onEdit={() => handleEdit(index)}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>
    </div>
  );
}
