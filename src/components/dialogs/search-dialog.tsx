"use client";
import type { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "../ui/input-group";
import { useQuery } from "@tanstack/react-query";
import { axion } from "axion";
export default function SearchDialog({
  opened,
  setIsOpen,
}: {
  opened: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const searchMutation = useQuery({
    queryKey: ["search"],
    queryFn: async () => {
      const res = axion;
      return;
    },
  });

  return (
    <Dialog
      open={opened}
      onOpenChange={(open: boolean) => {
        setIsOpen(open);
      }}
    >
      <DialogTrigger asChild></DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="top-20 h-fit border-none bg-transparent shadow-none"
      >
        <DialogHeader></DialogHeader>
        <InputGroup>
          <InputGroupInput />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </DialogContent>
    </Dialog>
  );
}
