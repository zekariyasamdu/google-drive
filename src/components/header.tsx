import React from "react"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "./ui/breadcrumb";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group"
import { Search } from "lucide-react";
import { useNavigateBreadcrumbs } from "~/hooks/use-navigate-breadcrumbs";
import SignIn from "./button/signin";
import SignOut from "./button/signout";
import { signIn } from "~/lib/auth/auth-client";
import { useMutation } from "@tanstack/react-query";
const Header = () => {

  const signupMutaion = useMutation({
    mutationKey: ["signup"],
    mutationFn: () => handelSignin()
  })

  const handelSignin = async () => {
    const res = await signIn();
    console.log(res)
  }

  return (
    <div className="flex flex-row gap-4 mt-3 ml-4">
      <div className="flex flex-col gap-4 mt-3 ml-4 w-fit">
        <SearchInput />
        <Nav />
      </div>
      <div className="flex gap-5 ml-auto mr-3 mt-3">
        <SignIn onClick={() => signupMutaion.mutate()} />
        <SignOut />
      </div>
    </div>
  )
}

const SearchInput = () => {
  return (
    <nav >
      <InputGroup>
        <InputGroupInput placeholder="Search In Drive" />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
    </nav>
  )

}

const Nav = () => {
  const { setCurrentcrumbId, breadcrumbs } = useNavigateBreadcrumbs();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink onClick={() => setCurrentcrumbId(null)} >My Drive</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {breadcrumbs?.map(item => (
          <div className="flex gap-1.5 items-center" key={item.id}>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => setCurrentcrumbId(item.id)} >{item.name}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Header
