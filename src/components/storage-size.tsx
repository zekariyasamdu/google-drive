import { QUERIES } from "~/server/db/queries-mutations";
import { CardDescription } from "./ui/card";
import { Progress } from "./ui/progress";
import { filesize } from "filesize";
const LIMIT_IN_BYTES = 100 * 1024 * 1024; // 104,857,600
export default async function StorageSize({ userId }: { userId: string }) {
  const data = await QUERIES.getTotlaFileSize(userId);
  const totalByte = data[0]?.size;
  const progressvalue = (Number(totalByte ?? 0) / LIMIT_IN_BYTES) * 100;
  return (
    <div className="flex h-fit w-full flex-col gap-2">
      <CardDescription>Storage</CardDescription>
      <Progress value={progressvalue} />
      <CardDescription>
        {filesize(totalByte ?? 0)} of {filesize(LIMIT_IN_BYTES)} used
      </CardDescription>
    </div>
  );
}
