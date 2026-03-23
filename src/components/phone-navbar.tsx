"use client";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Trash, Star, Home, User } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { cn } from "~/lib/utils";
const items = [
  { title: "My Drive", url: "/dashboard", icon: Home },
  { title: "Profile", url: "/profile", icon: User },
  { title: "Star", url: "/star", icon: Star },
  { title: "Trash", url: "/trash", icon: Trash },
];

export default function PhoneNav() {
  const path = usePathname();
  const pathArray = path.split("/");
  const pathname = `/${pathArray[1]}`;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] sm:w-[300px]">
        <SheetHeader className="text-left">
          <SheetTitle className="px-2">Menu</SheetTitle>
        </SheetHeader>
        <nav className="mt-2 flex flex-col gap-2">
          {items.map((item) => (
            <Link
              key={item.url}
              href={item.url}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                item.url === pathname
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
