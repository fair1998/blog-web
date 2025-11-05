"use client";

import { setToken } from "@/actions/auth/set-token";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/input-password";
import {
  SignInFormData,
  SignInFormSchema,
} from "@/lib/validators/sign-in.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

export default function SignInPage() {
  const form = useForm<SignInFormData>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = async (data: SignInFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const username = data.username;

    await setToken(username);
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your username below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="login-form" onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup>
            {/* field username */}
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-form-username">
                    Username
                  </FieldLabel>
                  <Input
                    {...field}
                    id="login-form-username"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your username"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* field password */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-form-password">
                    Password
                  </FieldLabel>
                  <InputPassword
                    {...field}
                    id="login-form-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          className="w-full"
          form="login-form"
          disabled={form.formState.isSubmitting}
        >
          Login
        </Button>
      </CardFooter>
    </Card>
  );
}
