import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { DialogFooter } from "../ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "../ui/spinner";
import { updateFileAction, updateFolderAction } from "~/action/mutation-actions";

const createFolderSchema = z.object({
  name: z.string().min(1),
})

export default function RenameItemsForm(
  { variant, itemId, fileKey }:
    { variant: "Folder" | "File", itemId: number, fileKey?: string }) {
  const router = useRouter();
  const mutation = useMutation({
    mutationKey: ["renameItem"],
    mutationFn: async (formData: z.infer<typeof createFolderSchema>) => {
      if (variant === "File" && fileKey !== undefined) {
        return await updateFileAction(itemId, { name: formData.name }, fileKey);
      }
      return await updateFolderAction(itemId, { name: formData.name })
    },
    onSuccess: () => {
      router.refresh();
    }
  });

  const form = useForm<z.infer<typeof createFolderSchema>>({
    resolver: zodResolver(createFolderSchema),
    defaultValues: {
      name: "",
    }
  });

  function onSubmit(data: z.infer<typeof createFolderSchema>) {
    mutation.mutate(data);
    router.refresh();
  }


  return (
    <div className="flex flex-col gap-4">
      <form id="form-item-rename" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-item-rename-name">
                  New Name
                </FieldLabel>
                <Input
                  {...field}
                  id="form-item-rename-name-field"
                  aria-invalid={fieldState.invalid}
                  placeholder="Name"
                  autoComplete="off"
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
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button disabled={mutation.isPending} form="form-item-rename" type="submit">
          {mutation.isPending ? <Spinner /> : "Create"}
        </Button>
      </DialogFooter>
    </div>
  )
}

