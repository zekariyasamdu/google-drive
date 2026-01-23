"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { useRouter } from "next/navigation";
import { authClient } from "~/lib/auth/auth-client";
import { useMutation } from "@tanstack/react-query";
import { error } from "console";
import { toast } from "sonner";

const SignupSchema = z
  .object({
    username: z
      .string()
      .min(4, "Username field has to have more than 4 characters"),
    email: z.string().email("This is not a valid email"),
    password: z
      .string()
      .min(8, "Password field needs to have more than 5 charachters"),
    reEnterPassword: z
      .string()
      .min(4, "Username field has to have more than 4 characters"),
  })
  .refine((data) => data.reEnterPassword === data.password, {
    path: ["reEnterPassword"],
    message: "Password do not match",
  });

export default function SignupForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      reEnterPassword: ""
    }
  });
  const signupEmailAndPassword = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (formData: z.infer<typeof SignupSchema>) => {
      const { data, error } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.username,
        callbackURL: "/dashboard",
      });
      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      toast.success("We have sent an email, verify your account!")
    },
    onError: (e) => {
      toast.error(e.message)
    },
  });
  console.log(signupEmailAndPassword.isPending)
  const navToLogin = () => {
    router.push("/auth/login");
  };

  return (

    <div className="h-full w-full border-none p-4">
      <CardHeader className="relative">
      </CardHeader>
      <CardContent>
        <form id="form-login" onSubmit={form.handleSubmit(data => signupEmailAndPassword.mutate(data))}>
          <FieldGroup>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>username</FieldLabel>
                  <Input
                    {...field}
                    autoComplete="off"
                    placeholder="root"
                    required
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>email</FieldLabel>
                  <Input
                    {...field}
                    required
                    autoComplete="off"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="example@gmail.com"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>password</FieldLabel>
                  <Input
                    {...field}
                    required
                    autoComplete="off"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="root@1234"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="reEnterPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>re-enter password</FieldLabel>
                  <Input
                    {...field}
                    required
                    autoComplete="off"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="root@1234"
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
      <CardFooter className="mb-0 mt-4">
        <CardAction className="w-full flex flex-col gap-4">
          <Button
            form="form-login"
            disabled={form.formState.isSubmitting || signupEmailAndPassword.isPending}
            className="w-full"
          >
            Create Account
          </Button>
          <Button
            variant={"outline"}
            id="form-login"
            disabled={form.formState.isSubmitting || signupEmailAndPassword.isPending}
            className="w-full hover:text-primary"
            onClick={() => navToLogin()}
          >
            Login
          </Button>
        </CardAction>
      </CardFooter>
    </div>
  );
}
