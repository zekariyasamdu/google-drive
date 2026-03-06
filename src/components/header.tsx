"use client";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Search } from "lucide-react";
import { signOut } from "~/lib/auth/auth-client";
import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Header = () => {
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
    <div className="mt-3 ml-4 flex flex-row gap-4">
      <div className="mt-3 ml-4 flex w-fit flex-col gap-4">
        <SearchInput />
      </div>
      <div className="mt-3 mr-3 ml-auto flex gap-5">
        <Button className="w-25" onClick={() => signoutMutaion.mutate()}>
          Signout
        </Button>
      </div>
    </div>
  );
};
const SearchInput = () => {
  return (
    <nav>
      <InputGroup>
        <InputGroupInput placeholder="Search In Drive" />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
    </nav>
  );
};
export default Header;
