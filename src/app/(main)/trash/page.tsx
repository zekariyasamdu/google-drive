import { ContentItemsCard } from "~/components/cards/content-items";
import { EmptyTrash } from "~/components/empty/empty-trash";
import { verifyUser } from "~/server/auth/verify-user";
import { QUERIES } from "~/server/db/queries-mutations";

const Trash = async () => {
  const session = await verifyUser();
  const userId = session.user.id;

  const [folders, files] = await Promise.all([
    QUERIES.getFolderByParent(userId, null),
    QUERIES.getFilesByParent(userId, null),
  ]);
  console.log(files.length, folders.length);

  const filterTrashFolders = folders.filter((item) => item.trash === true);
  const filterTrashFiles = files.filter((item) => item.trash === true);

  if (filterTrashFolders.length === 0 && filterTrashFiles.length === 0) {
    return <EmptyTrash />;
  }
  return (
    <div className="mt-5 ml-auto flex w-full flex-row flex-wrap gap-10 pl-10">
      <ContentItemsCard data={folders} />
      <ContentItemsCard data={files} />
    </div>
  );
};
export default Trash;
