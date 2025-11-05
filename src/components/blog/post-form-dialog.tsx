import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PostFormData, postFormSchema } from "@/lib/validators/post.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Switch } from "../ui/switch";

const defaultValues = {
  public: true,
  title: "",
  description: "",
  content: "",
};

interface PostFormDialogProps {
  open?: boolean;
  data?: PostFormData;
  onSubmit?: (data: z.infer<typeof postFormSchema>) => Promise<void> | void;
  onClose?: () => void;
}

export function PostFormDialog({
  open,
  data,
  onSubmit,
  onClose,
}: PostFormDialogProps) {
  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues,
  });

  const handleSubmit = async (data: z.infer<typeof postFormSchema>) => {
    if (typeof onSubmit === "function") {
      await onSubmit(data);
      handleClose();
    }
  };

  const handleClose = () => {
    if (typeof onClose === "function") {
      onClose();
      form.reset(defaultValues);
    }
  };

  const handleReset = useCallback(() => {
    form.reset(data ?? defaultValues);
  }, [data, form]);

  useEffect(() => {
    if (data) {
      handleReset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent showCloseButton>
        <DialogHeader>
          <DialogTitle>New Post</DialogTitle>
          <DialogDescription>
            Please provide the details below to create your new blog post.
          </DialogDescription>
        </DialogHeader>

        <form id="form-rhf-demo" onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup>
            {/* field public */}
            <Controller
              name="public"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel htmlFor="form-rhf-demo-public">Public</FieldLabel>
                  <Switch
                    id="form-rhf-demo-public"
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </Field>
              )}
            />

            {/* field title */}
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">Title</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter title"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* field description */}
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Description
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-description"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter description"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* field content */}
            <Controller
              name="content"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-content">
                    Content
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="form-rhf-demo-content"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter content"
                    rows={3}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>

        <DialogFooter>
          <Field orientation="horizontal">
            <Button
              variant="destructive"
              onClick={handleReset}
              disabled={form.formState.isSubmitting}
              className="flex-1"
            >
              Reset
            </Button>
            <Button
              type="submit"
              form="form-rhf-demo"
              disabled={form.formState.isSubmitting}
              className="flex-1"
            >
              Submit
            </Button>
          </Field>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
