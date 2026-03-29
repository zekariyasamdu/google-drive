import { List, LayoutGrid } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

export function GridListToggle({
  isGrid,
  setIsGrid,
}: {
  isGrid: boolean;
  setIsGrid: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      className="bg-secondary/50 flex cursor-pointer items-center rounded-lg border p-1"
      onClick={() => {
        setIsGrid((prev) => {
          const next = !prev;
          localStorage.setItem("itemView", next ? "grid" : "list");
          return next;
        });
      }}
    >
      <div
        className={`rounded-md p-1.5 transition-all ${!isGrid ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
      >
        <List className="h-4 w-4" />
      </div>

      <div
        className={`rounded-md p-1.5 transition-all ${isGrid ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
      >
        <LayoutGrid className="h-4 w-4" />
      </div>
    </div>
  );
}
