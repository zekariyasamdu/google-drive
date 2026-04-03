"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authClient } from "~/lib/auth/auth-client";

const RenameSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Username field has to have more than 8 characters"),
    newPassword: z
      .string()
      .min(8, "Username field has to have more than 8 characters"),
    confirmNewPassword: z
      .string()
      .min(8, "Username field has to have more than 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Password do not match",
  });

export default function ChangePassword() {
  const route = useRouter();
  const form = useForm<z.infer<typeof RenameSchema>>({
    resolver: zodResolver(RenameSchema),
    defaultValues: {
      newPassword: "",
      currentPassword: "",
      confirmNewPassword: "",
    },
  });
  const changePasswordMutation = useMutation({
    mutationKey: ["changeName"],
    mutationFn: async (formData: z.infer<typeof RenameSchema>) => {
      // const typeOfSignIn = await authClient.listAccounts();

      const { data, error } = await authClient.changePassword({
        newPassword: formData.newPassword,
        currentPassword: formData.currentPassword,
        revokeOtherSessions: true,
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      toast.success("Password Changed!");
      route.refresh();
    },
    onError: (e) => {
      toast.error(e.message ?? "Error occured!");
    },
  });

  return (
    <div>
      <form
        id="form-change-password"
        onSubmit={form.handleSubmit((data) =>
          changePasswordMutation.mutate(data),
        )}
      >
        <FieldGroup>
          <Controller
            name="currentPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Current Password</FieldLabel>
                <div className="flex flex-col items-center gap-1">
                  <Input
                    {...field}
                    autoComplete="off"
                    placeholder="Enter your full name"
                    required
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </div>
              </Field>
            )}
          />

          <Controller
            name="newPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>New Password</FieldLabel>
                <div className="flex flex-col items-center gap-1">
                  <Input
                    {...field}
                    autoComplete="off"
                    placeholder="Enter your full name"
                    required
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </div>
              </Field>
            )}
          />

          <Controller
            name="confirmNewPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Confirm New Password</FieldLabel>
                <div className="flex flex-col items-center gap-1">
                  <Input
                    {...field}
                    autoComplete="off"
                    placeholder="Enter your full name"
                    required
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </div>
              </Field>
            )}
          />

          <Button
            form="form-change-password"
            disabled={
              form.formState.isSubmitting || changePasswordMutation.isPending
            }
          >
            Change password
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
