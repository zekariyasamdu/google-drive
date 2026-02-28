"use client";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { CardAction, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { useRouter } from "next/navigation";
import { signIn } from "~/lib/auth/auth-client";
import { useMutation } from "@tanstack/react-query";
import { authClient } from "~/lib/auth/auth-client";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password field needs to have more than 5 charachters"),
});

function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupGoogleMutaion = useMutation({
    mutationKey: ["loginGoogle"],
    mutationFn: async () => {
      const { data, error } = await signIn();
      if (error?.message) {
        throw new Error(error.message);
      }
      return data;
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const signupEmailAndPassword = useMutation({
    mutationKey: ["loginEmail"],
    mutationFn: async (formData: z.infer<typeof LoginSchema>) => {
      const { data, error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        callbackURL: "/dashboard",
        rememberMe: true,
      });
      if (error?.message) {
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: (data) => {
      toast.success(`Welcome ${data?.user.name}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof LoginSchema>> = async (data) => {
    signupEmailAndPassword.mutate(data);
  };

  const navToSignup = () => {
    router.push("/auth/signup");
  };

  return (
    <div className="h-full w-full border-none p-4">
      <CardContent>
        <form id="form-login" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>email</FieldLabel>
                  <Input
                    {...field}
                    autoComplete="off"
                    placeholder="example@gmail.com"
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
                    placeholder="zach@1234"
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
      <CardFooter className="mt-3 mb-0">
        <CardAction className="flex w-full flex-col gap-4">
          <Button
            form="form-login"
            disabled={
              signupEmailAndPassword.isPending || signupGoogleMutaion.isPending
            }
            type="submit"
            className="w-full"
          >
            {signupEmailAndPassword.isPending ? <Spinner /> : "Login"}
          </Button>
          <Button
            variant={"outline"}
            id="form-login"
            disabled={form.formState.isSubmitting}
            className="hover:text-primary w-full"
            onClick={() => navToSignup()}
          >
            Signup
          </Button>

          <div className="my-5 flex items-center gap-2">
            <div className="border-border grow border-t"></div>
            <span className="bold text-xs uppercase">OR</span>
            <div className="border-border grow border-t"></div>
          </div>

          <Button
            variant={"ghost"}
            onClick={() => signupGoogleMutaion.mutate()}
            className="bg-blue-400"
          >
            Continue with Google
          </Button>
        </CardAction>
      </CardFooter>
    </div>
  );
}

export default LoginForm;
