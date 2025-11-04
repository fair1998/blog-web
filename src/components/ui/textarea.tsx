import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "w-full flex",
        "md:text-sm text-base",
        "py-2 px-3",
        "border rounded-md shadow-xs",
        "border-input bg-transparent",
        "transition-[color,box-shadow]",
        "outline-none",
        "placeholder:text-muted-foreground",
        "disabled:cursor-not-allowed",
        "disabled:opacity-50",
        "focus-visible:ring-[3px]",
        "focus-visible:border-ring",
        "focus-visible:ring-ring/50",
        "aria-invalid:ring-destructive/20",
        "aria-invalid:border-destructive",
        // "field-sizing-content",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
