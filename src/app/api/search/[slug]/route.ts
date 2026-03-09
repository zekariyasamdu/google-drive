import { NextResponse } from "next/server";
import { verifyUser } from "~/server/auth/verify-user";
import { QUERIES } from "~/server/db/queries-mutations";

export async function GET(param: Promise<{ param: { slug: string } }>) {
  const req = await param;
  const query = req.param.slug;

  try {
    const session = await verifyUser();
    const userId = session.user.id;

    const [folders, files] = await Promise.all([
      QUERIES.getSearchFolders(userId, query),
      QUERIES.getSearchFile(userId, query),
    ]);
    return NextResponse.json({ folders, files });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
