import React from "react"
import UploadButton from "./button/upload";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "./ui/breadcrumb";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group"
import { Search } from "lucide-react";
import { useNavigateBreadcrumbs } from "~/hooks/use-navigate-breadcrumbs";
const Header = () => {
  return (
    <div className="flex flex-row gap-4 mt-3 ml-4">
      <div className="flex flex-col gap-4 mt-3 ml-4 w-fit">
        <SearchInput />
        <Nav />
      </div>
      <div className="ml-auto mr-3 mt-3">
        <UploadButton />
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
