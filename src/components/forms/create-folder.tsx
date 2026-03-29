import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { usePathname } from "next/navigation";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { DialogFooter } from "../ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "../ui/spinner";
import { authClient } from "~/lib/auth/auth-client";
import type { TFileSelect, TFolderInsert, TFolderSelect } from "~/lib/types/db";
import { createFolderAction } from "~/server/actions/mutation-actions";
import type { Action } from "../dropdown-menu";
import { toast } from "sonner";
import { processPath } from "~/lib/utils";

export const createFolderSchema = z.object({
  name: z.string().min(1),
});

export default function CreateFolderForm({
  setIsOpen,
}: {
  setIsOpen: (action: Action) => void;
}) {
  const currentPath = usePathname();
  const { routeName, folderId } = processPath(currentPath);
  const queryClient = useQueryClient();
  const { data: session } = authClient.useSession();

  const queryKey = ["folderAndFile", routeName, folderId];

  const mutation = useMutation({
    mutationKey: ["createFolder"],
    mutationFn: async (
      formData: TFolderInsert & { tempId: string },
      context,
    ) => {
      const { tempId, ...data } = formData;
      await context.client.cancelQueries({ queryKey });
      let previousTodos = context.client.getQueryData(queryKey);
      previousTodos = previousTodos ?? { folders: [], files: [] };

      context.client.setQueryData(
        queryKey,
        (
          old: { folders: TFolderSelect[]; files: TFileSelect[] } | undefined,
        ) => {
          const current = old ?? { folders: [], files: [] };

          return {
            folders: [...current.folders, formData],
            files: current.files,
          };
        },
      );
      toast.success("Folder created!");
      await createFolderAction({ ...data });
      return { previousTodos };
    },
    onError: (
      err,
      newTodo,
      onMutateResult:
        | { previousTodos: { folders: TFolderSelect[]; files: TFileSelect[] } }
        | undefined,
      context,
    ) => {
      context.client.setQueryData(queryKey, onMutateResult?.previousTodos);
      toast.error("Error creating folder!");
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  });

  const form = useForm<z.infer<typeof createFolderSchema>>({
    resolver: zodResolver(createFolderSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: z.infer<typeof createFolderSchema>) {
    if (!session?.user?.id) {
      throw new Error("Not authenticated");
    }
    const tempId = crypto.randomUUID();
    const folderData: TFolderInsert = {
      name: data.name,
      owner_id: session.user.id,
      parent: folderId,
      star: false,
      trash: false,
    };
    mutation.mutate({ ...folderData, tempId });
    setIsOpen({ type: "toggleFolder", state: false });
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
                <FieldLabel htmlFor="form-folder-create-name">Name</FieldLabel>
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
        <Button
          disabled={mutation.isPending}
          form="form-folder-create"
          type="submit"
          className="w-20"
        >
          {mutation.isPending ? <Spinner /> : "Create"}
        </Button>
      </DialogFooter>
    </div>
  );
}
