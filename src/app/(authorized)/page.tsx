"use client";

import BlogCard from "@/components/blog-card";
import {
  PostFormData,
  PostFormDialog,
} from "@/components/blog/post-form-dialog";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { useBlogPosts } from "@/hooks/use-blog-posts";
import { useDebouncedSearch } from "@/hooks/use-debounced-search";
import { BlogPost } from "@/types/blog";
import { Search } from "lucide-react";
import { useState } from "react";

interface PostFormDialogState {
  open: boolean;
  data: BlogPost | undefined;
}

export default function HomePage() {
  const { blogPosts, deletePost, submitPost } = useBlogPosts();

  const [postFormDialogState, setPostFormDialogState] =
    useState<PostFormDialogState>({
      open: false,
      data: undefined,
    });

  const { searchQuery, isDebouncing, handleInputChange } = useDebouncedSearch();

  const toggleDialog = () => {
    setPostFormDialogState((prev) => ({
      ...prev,
      open: !prev.open,
      data: undefined,
    }));
  };

  const openEditDialog = (post: BlogPost) => {
    setPostFormDialogState((prev) => ({
      ...prev,
      open: true,
      data: post,
    }));
  };

  const handleSubmitPost = async (values: PostFormData) => {
    const postIdToEdit = postFormDialogState.data?.id;
    await submitPost(values, postIdToEdit);
  };

  const filterPosts = (searchQuery: string) => {
    return blogPosts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredPosts = filterPosts(searchQuery);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Blog management</h1>
        <Button onClick={toggleDialog}>New Post</Button>
      </div>

      <div className="flex items-center justify-between gap-4">
        <InputGroup className="w-full max-w-xs">
          <InputGroupInput
            placeholder="Search..."
            onChange={handleInputChange}
          />
          <InputGroupAddon>
            {isDebouncing ? <Spinner /> : <Search />}
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="flex flex-col gap-4">
        {filteredPosts.map((post) => (
          <BlogCard
            key={post.id}
            title={post.title}
            description={post.description}
            content={post.content}
            isPublic={post.public}
            onEdit={() => openEditDialog(post)}
            onDelete={() => deletePost(post.id)}
          />
        ))}
      </div>

      <PostFormDialog
        open={postFormDialogState.open}
        data={postFormDialogState.data}
        onSubmit={handleSubmitPost}
        onClose={toggleDialog}
      />
    </div>
  );
}
