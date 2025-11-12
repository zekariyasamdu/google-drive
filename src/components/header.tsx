import UploadButton from "./button/upload";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "./ui/breadcrumb";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group"
import { Search } from "lucide-react";
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
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">My Drive</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Folders</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>

  )
}

export default Header
