import { NextResponse } from "next/server";
import { verifyUser } from "~/server/auth/verify-user";
import { QUERIES } from "~/server/db/queries-mutations";

export async function GET() {
  try {
    const session = await verifyUser();
    const userId = session.user.id;
    if (!userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const [folders, files] = await Promise.all([
      QUERIES.getFolderExcludingTrahsed(userId, null),
      QUERIES.getFilesExcludingTrashed(userId, null),
    ]);

    return NextResponse.json({ folders, files }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 },
    );
  }
}
