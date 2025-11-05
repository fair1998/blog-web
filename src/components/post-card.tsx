"use client";

import { cn } from "@/lib/utils";
import { Eye, SquarePen, Trash } from "lucide-react";
import { useState } from "react";
import { Badge } from "./ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";

interface PostCardProps {
  title: string;
  description: string;
  content: string;
  isPublic: boolean;

  onEdit?: () => void;
  onDelete?: () => void;
}

export default function PostCard({
  title,
  description,
  content,
  isPublic,
  onEdit,
  onDelete,
}: PostCardProps) {
  const [isViewExpanded, setIsViewExpanded] = useState(false);

  const handleViewToggle = () => {
    setIsViewExpanded(!isViewExpanded);
  };

  return (
    <Card>
      <CardHeader className="has-data-[slot=card-action]:grid-cols-[1fr] sm:has-data-[slot=card-action]:grid-cols-[1fr_auto]">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>

        <CardAction className="col-start-1 sm:col-start-2">
          <div className="flex items-center gap-x-4 h-5">
            <button
              onClick={handleViewToggle}
              className={cn(
                "hover:text-primary transition-colors cursor-pointer",
                {
                  "text-primary": isViewExpanded,
                }
              )}
            >
              <Eye className="size-5" />
            </button>
            <Separator orientation="vertical" />
            <button
              onClick={onEdit}
              className="hover:text-secondary transition-colors"
            >
              <SquarePen className="size-5" />
            </button>
            <Separator orientation="vertical" />
            <button
              onClick={onDelete}
              className="hover:text-destructive transition-colors"
            >
              <Trash className="size-5" />
            </button>
            <Separator orientation="vertical" />
            <Badge
              variant={isPublic ? "default" : "secondary"}
              className="min-w-16"
            >
              {isPublic ? "Public" : "Private"}
            </Badge>
          </div>
        </CardAction>
      </CardHeader>

      <CardContent>
        <p className={cn(isViewExpanded ? "line-clamp-none" : "line-clamp-3")}>
          {content}
        </p>
      </CardContent>
    </Card>
  );
}
