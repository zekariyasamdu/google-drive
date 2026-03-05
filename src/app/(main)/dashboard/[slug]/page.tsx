import { ContentItemsCard } from "~/components/cards/content-items";
import { EmptyFolder } from "~/components/empty/empty-folder";
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
  const [folders, files] = await Promise.all([
    QUERIES.getFolderByParentExcludingTrahsed(userId, slugInt),
    QUERIES.getFilesByParentExcludingTrashed(userId, slugInt),
  ]);

  if (folders.length === 0 && files.length === 0) {
    return <EmptyFolder />;
  }

  return (
    <div className="mt-5 ml-auto flex w-full flex-row flex-wrap gap-10 pl-10">
      <ContentItemsCard folderOrFileItems={folders} />
      <ContentItemsCard folderOrFileItems={files} />
    </div>
  );
}
