import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export async function verifyUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/auth/login");
  }
  return session;
}
