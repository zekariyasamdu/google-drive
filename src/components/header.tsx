"use client";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Search } from "lucide-react";
import { useNavigateBreadcrumbs } from "~/hooks/use-navigate-breadcrumbs";
import { authClient, signOut } from "~/lib/auth/auth-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Header = () => {
  const route = useRouter();
  const signoutMutaion = useMutation({
    mutationKey: ["signup"],
    mutationFn: () => handelSignout(),
  });

  const handelSignout = async () => {
    const res = await signOut();
    console.log(res.data);
    route.push("/auth/login")
  };

  const userInfo = useQuery({
    queryKey: ["usr"],
    queryFn: async () => {
      return await authClient.getSession();
    },
  });
  
  console.log(userInfo.data);

  return (
    <div className="mt-3 ml-4 flex flex-row gap-4">
      <div className="mt-3 ml-4 flex w-fit flex-col gap-4">
        <SearchInput />
        <Nav />
      </div>
      <div className="mt-3 mr-3 ml-auto flex gap-5">
        <Button
          className="w-25"
          onClick={() => signoutMutaion.mutate()}
        >
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

const Nav = () => {
  const { setCurrentcrumbId, breadcrumbs } = useNavigateBreadcrumbs();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink onClick={() => setCurrentcrumbId(null)}>
            My Drive
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {breadcrumbs?.map((item) => (
          <div className="flex items-center gap-1.5" key={item.id}>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => setCurrentcrumbId(item.id)}>
                {item.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Header;
