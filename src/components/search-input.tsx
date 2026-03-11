"use client";
import { Search } from "lucide-react";
import { InputGroup, InputGroupInput, InputGroupAddon } from "./ui/input-group";
import SearchDialog from "./dialogs/search-dialog";
import { useState } from "react";

const SearchInput = () => {
  const [isOpened, _toggleDialog] = useState(false);
  const toggleDialog = (value: boolean) => {
    _toggleDialog(value);
  };
  return (
    <nav>
      <InputGroup>
        <InputGroupInput
          onFocus={() => _toggleDialog(true)}
          placeholder="Search In Drive"
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
      <SearchDialog opened={isOpened} setIsOpenAction={toggleDialog} />
    </nav>
  );
};
export default SearchInput;
