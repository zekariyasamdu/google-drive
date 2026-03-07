import { Search } from "lucide-react";
import { InputGroup, InputGroupInput, InputGroupAddon } from "./ui/input-group";

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
export default SearchInput;
