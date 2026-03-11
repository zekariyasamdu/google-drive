import { type NextRequest, NextResponse } from "next/server";
import { verifyUser } from "~/server/auth/verify-user";
import { QUERIES } from "~/server/db/queries-mutations";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const req = await params;
  const query = req.slug;

  try {
    const session = await verifyUser();
    const userId = session.user.id;

    const [folders, files] = await Promise.all([
      QUERIES.getSearchFolders(userId, query),
      QUERIES.getSearchFile(userId, query),
    ]);
    return NextResponse.json({ folders, files }, { status: 200 });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
