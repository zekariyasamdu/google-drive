"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateUserAction } from "~/action/mutation-actions";
import { useRouter } from "next/navigation";

const RenameSchema = z
  .object({
    name: z
      .string()
      .min(4, "Username field has to have more than 4 characters"),
  });

export default function RenameUsernameForm({ initailName }: { initailName: string }) {
  const route = useRouter()
  const form = useForm<z.infer<typeof RenameSchema>>({
    resolver: zodResolver(RenameSchema),
    defaultValues: {
      name: initailName,
    }
  });
  const changeNameMutation = useMutation({
    mutationKey: ["changeName"],
    mutationFn: async (formData: z.infer<typeof RenameSchema>) => {
      await updateUserAction(formData)
    },
    onSuccess: () => {
      toast.success("Name updated!")
      route.refresh();
    },
    onError: (e) => {
      toast.error(e.message ?? "Error occured!")
    },
  });

  return (

    <div>
      <form  id="form-rename-name" onSubmit={form.handleSubmit(data => changeNameMutation.mutate(data))}>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Full Name</FieldLabel>
                <div className="flex gap-6 items-center ">
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

                  <Button
                    form="form-rename-name"
                    disabled={form.formState.isSubmitting || changeNameMutation.isPending}
                  >
                    Rename
                  </Button>

                </div>
              </Field>
            )}
          />
        </FieldGroup>
      </form>

    </div>
  );
}
