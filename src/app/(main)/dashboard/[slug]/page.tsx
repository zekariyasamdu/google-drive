import DriveContent from "~/components/drive-content";
import { verifyUser } from "~/server/auth/verify-user";
import { QUERIES } from "~/server/db/queries-mutations";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await verifyUser();
  const userId = session.user.id;

  const { slug } = await params;
  const slugInt = Number(slug);
  const [folders, files, parents] = await Promise.all([
    QUERIES.getFolderExcludingTrahsed(userId, slugInt),
    QUERIES.getFilesExcludingTrashed(userId, slugInt),
    QUERIES.getAllParents(slugInt),
  ]);

  return <DriveContent folders={folders} files={files} parents={parents} />;
}
