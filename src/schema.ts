import z from "zod";

export const folderZodSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  owner_id: z.string().min(1),
  parent: z.number().nullable().default(null),
  star: z.boolean(),
  trash: z.boolean(),
});

export const fileZodSchema = z.object({
  id: z.number().int().positive(),
  owner_id: z.string().min(1),
  name: z.string().min(1),
  parent: z.number().int().nullable(),
  url: z.string().url(),
  trash: z.boolean(),
  star: z.boolean(),
  size: z.number().int(),
  fileKey: z.string(),
});

export const FolderAndFileSelectSchema = z.object({
  folders: z.array(folderZodSchema).default([]),
  files: z.array(fileZodSchema).default([]),
});
