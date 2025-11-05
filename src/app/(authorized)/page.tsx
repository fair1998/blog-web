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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBlogPosts } from "@/hooks/use-blog-posts";
import { BlogPost } from "@/types/blog";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

interface PostFormDialogState {
  open: boolean;
  data: BlogPost | undefined;
}

interface FilterState {
  search: string;
  type: "all" | "public" | "private";
}

export default function HomePage() {
  const { blogPosts, deletePost, submitPost } = useBlogPosts();

  const [postFormDialogState, setPostFormDialogState] =
    useState<PostFormDialogState>({
      open: false,
      data: undefined,
    });

  const [filterState, setFilterState] = useState<FilterState>({
    search: "",
    type: "all",
  });

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

  const handleFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilterState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesType =
        filterState.type === "all"
          ? true
          : filterState.type === "public"
          ? post.public
          : !post.public;

      const matchesSearch = post.title
        .toLowerCase()
        .includes(filterState.search.toLowerCase());

      return matchesType && matchesSearch;
    });
  }, [blogPosts, filterState]);

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
            onChange={(e) => handleFilter("search", e.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>

        <Select
          value={filterState.type}
          onValueChange={(value) =>
            handleFilter("type", value as FilterState["type"])
          }
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="private">Private</SelectItem>
            <SelectItem value="public">Public</SelectItem>
          </SelectContent>
        </Select>
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
