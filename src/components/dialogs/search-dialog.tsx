"use client";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "../ui/input-group";
import axios from "axios";
import { asyncDebounce } from "@tanstack/pacer";
import type { TFileSelect, TFolderSelect } from "~/lib/types/db";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { useRouter } from "next/navigation";
export default function SearchDialog({
  opened,
  setIsOpenAction,
}: {
  opened: boolean;
  setIsOpenAction: (value: boolean) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [queryResult, setQueryResult] = useState<
    | {
        folders: TFolderSelect[];
        files: TFileSelect[];
      }
    | undefined
  >(undefined);
  const debouncedSearch = asyncDebounce(
    async (searchTerm: string) => {
      const fetchSearchResults = async () => {
        const res = await axios.get(`/api/search/${searchTerm}`);
        if (res.status !== 200) {
          const error = res.data as { message: string };
          console.error("error", error.message);
          throw new Error("Something went wrong while searching ");
        }
        return res.data as { folders: TFolderSelect[]; files: TFileSelect[] };
      };
      const results = await fetchSearchResults();
      return results;
    },
    {
      wait: 500,
      onSuccess: (results) => {
        console.log("Search succeeded:", results);
      },
      onError: (error) => {
        console.error("Search failed:", error);
        toast.error("Search failed");
      },
    },
  );

  const onChangeAction = (query: string) => {
    startTransition(async function () {
      if (query === "") {
        setQueryResult(undefined);
        return;
      }
      const result = await debouncedSearch(query);
      setQueryResult(result);
    });
  };

  return (
    <Dialog
      open={opened}
      onOpenChange={(open: boolean) => {
        setIsOpenAction(open);
      }}
    >
      <DialogTrigger asChild></DialogTrigger>

      <DialogContent showCloseButton={false} className="h-fit">
        <InputGroup>
          <InputGroupInput
            className=""
            onChange={(e) => {
              onChangeAction(e.target.value);
            }}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
        <div className="bg-sidebar h-50 w-full overflow-x-scroll rounded-xl">
          {isPending ? (
            <Spinner className="mx-auto mt-4" />
          ) : (
            <SearchItems searchResult={queryResult} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SearchItems({
  searchResult,
}: {
  searchResult:
    | {
        folders: TFolderSelect[];
        files: TFileSelect[];
      }
    | undefined;
}) {
  const route = useRouter();
  return (
    <div className="p-1">
      {searchResult ? (
        <div className="flex flex-col gap-1">
          <p className="ml-5 text-sm text-gray-500">Search Result</p>
          {searchResult?.folders?.map((folder) => (
            <div
              key={folder.id}
              className="mx-5 rounded-xl border border-transparent p-1 hover:border-neutral-800"
              onClick={() => {
                route.push(`/dashboard/${folder.id}`);
              }}
            >
              {folder.name}
            </div>
          ))}
          {searchResult?.files?.map((file) => (
            <div
              key={file.id}
              className="mx-5 rounded-xl border border-transparent p-1 hover:border-neutral-800"
              onClick={() => {
                route.push(`/dashboard/${file.parent}`);
              }}
            >
              {file.name}
            </div>
          ))}
        </div>
      ) : (
        <p className="m-3 text-sm text-gray-500">Type something to search...</p>
      )}
    </div>
  );
}
