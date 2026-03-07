"use client";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { signOut } from "~/lib/auth/auth-client";
import { useRouter } from "next/navigation";

export default function Signout() {
  const route = useRouter();
  const signoutMutaion = useMutation({
    mutationKey: ["signup"],
    mutationFn: () => handelSignout(),
  });

  const handelSignout = async () => {
    await signOut();
    route.push("/auth/login");
  };
  return (
    <Button className="w-25" onClick={() => signoutMutaion.mutate()}>
      Signout
    </Button>
  );
}
