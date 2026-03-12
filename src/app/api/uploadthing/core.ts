import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { UploadThingError } from "uploadthing/server";
import { auth } from "~/server/auth/auth";
import { MUTATION } from "~/server/db/queries-mutations";
import { headers } from "next/headers";
import z from "zod";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileCount: 1,
    },
  })
    .input(
      z.object({
        currentCrumbId: z.number().nullable(),
        isProfilePicture: z.boolean().nullable(),
      }),
    )
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req, input }) => {
      // This code runs on your server before upload
      // const user = await auth(req);

      // If you throw, the user will not be able to upload

      const session = await auth.api.getSession({
        headers: await headers(),
      });
      if (!session) throw new Error("Unauthorized");
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      const userId = session.user.id;
      const parentId = input?.currentCrumbId;
      const isProfilePicture = input.isProfilePicture;
      return { userId, parentId, isProfilePicture };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      if (metadata.isProfilePicture === true) {
        await MUTATION.updateUser(metadata.userId, {
          image: file.ufsUrl,
          imageFileKey: file.key,
        });
        return;
      }
      const fileData = {
        owner_id: String(metadata.userId),
        name: file.name,
        parent: metadata.parentId,
        url: file.ufsUrl,
        size: file.size,
        fileKey: file.key,
        trash: false,
        star: false,
      };
      await MUTATION.createFile(fileData);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { success: true };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
