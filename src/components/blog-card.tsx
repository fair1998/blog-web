"use client";

import { cn } from "@/lib/utils";
import { Eye, SquarePen, Trash } from "lucide-react";
import Link from "next/link";
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

interface BlogCardProps {
  isPublic: boolean;
}

export default function BlogCard({ isPublic }: BlogCardProps) {
  const [isViewExpanded, setIsViewExpanded] = useState(false);

  const handleViewToggle = () => {
    setIsViewExpanded(!isViewExpanded);
  };

  return (
    <Card>
      <CardHeader className="has-data-[slot=card-action]:grid-cols-[1fr] sm:has-data-[slot=card-action]:grid-cols-[1fr_auto]">
        <CardTitle>Blog 0001</CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </CardDescription>

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
            <Link href="#" className="hover:text-secondary transition-colors">
              <SquarePen className="size-5" />
            </Link>
            <Separator orientation="vertical" />
            <Link href="#" className="hover:text-destructive transition-colors">
              <Trash className="size-5" />
            </Link>
            <Separator orientation="vertical" />
            <Badge variant={isPublic ? "default" : "secondary"}>
              {isPublic ? "Public" : "Private"}
            </Badge>
          </div>
        </CardAction>
      </CardHeader>

      <CardContent>
        <p className={cn(isViewExpanded ? "line-clamp-none" : "line-clamp-3")}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
          quibusdam, aliquam deleniti aliquid ipsam magnam dolore!
          Necessitatibus eligendi a tempora iusto reiciendis impedit alias
          doloremque nesciunt asperiores nemo, quibusdam possimus. Lorem, ipsum
          dolor sit amet consectetur adipisicing elit. Sapiente nihil, obcaecati
          quisquam doloribus impedit consectetur. Ducimus explicabo vel velit
          reiciendis consectetur, inventore quo omnis. Vitae iusto veniam
          blanditiis sit similique. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Molestias quibusdam, aliquam deleniti aliquid ipsam
          magnam dolore! Necessitatibus eligendi a tempora iusto reiciendis
          impedit alias doloremque nesciunt asperiores nemo, quibusdam possimus.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente
          nihil, obcaecati quisquam doloribus impedit consectetur. Ducimus
          explicabo vel velit reiciendis consectetur, inventore quo omnis. Vitae
          iusto veniam blanditiis sit similique.
        </p>
      </CardContent>
    </Card>
  );
}
