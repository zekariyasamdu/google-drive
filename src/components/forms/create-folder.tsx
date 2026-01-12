import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { DialogFooter } from "../ui/dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Spinner } from "../ui/spinner";
import { authClient } from "~/lib/auth/auth-client";
import type { TFolderInsert } from "~/lib/types/db";
import { createFolderAction } from "~/action/mutation-actions";
import { useNavigateBreadcrumbs } from "~/hooks/use-navigate-breadcrumbs";

const createFolderSchema = z.object({
  name: z.string().min(1),
})

export default function CreateFolderForm() {
  const router = useRouter();
  const { currentCrumbId } = useNavigateBreadcrumbs()
  const userInfo = useQuery({
    queryKey: ["usr"],
    queryFn: async () => {
      return await authClient.getSession();
    },
  });

  const mutation = useMutation({
    mutationKey: ["createFolder"],
    mutationFn: async (formData: z.infer<typeof createFolderSchema>) => {
      if (!userInfo.data?.data?.user.id) {
        throw new Error("Not authenticated");
      }

      const folderData: TFolderInsert = {
        name: formData.name,
        owner_id: userInfo.data.data.user.id,
        parent: currentCrumbId,
      };

      return await createFolderAction(folderData);
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
      <form id="form-folder-create" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-folder-create-name">
                  Name
                </FieldLabel>
                <Input
                  {...field}
                  id="form-folder-create-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="New Folder"
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
        <Button disabled={mutation.isPending} form="form-folder-create" type="submit">
          {mutation.isPending ? <Spinner /> : "Create"}
        </Button>
      </DialogFooter>
    </div>
  )
}

