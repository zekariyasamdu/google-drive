"use client";
import { useRouter } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { useDroppable } from "@dnd-kit/react";
import { Ellipsis } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

const Nav = ({
  breadcrumbs,
}: {
  breadcrumbs: { id: number; name: string }[];
}) => {
  const { ref: dropRef } = useDroppable({
    id: `cumb-null`,
  });
  const route = useRouter();
  const path = "dashboard";
  let truncatedCrmbs = breadcrumbs;
  if (breadcrumbs.length > 2) {
    truncatedCrmbs = breadcrumbs.slice(-2);
  }
  const handelClick = async () => {
    route.push(`/${path}`);
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {breadcrumbs.length < 2 ? (
            <BreadcrumbLink ref={dropRef} onClick={handelClick}>
              Drive
            </BreadcrumbLink>
          ) : (
            <Ellipsis />
          )}
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {truncatedCrmbs?.map((item) => (
          <BreadcrumbItems key={item.id} breadcrumb={item} />
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const BreadcrumbItems = ({
  breadcrumb,
}: {
  breadcrumb: { id: number; name: string };
}) => {
  const { ref: dropRef } = useDroppable({
    id: `cumb-${breadcrumb.id}`,
  });
  const route = useRouter();
  const path = "dashboard";
  const handelClick = async () => {
    route.push(`/${path}/${breadcrumb.id}`);
  };
  return (
    <div className="flex items-center gap-1.5">
      <BreadcrumbItem ref={dropRef}>
        <BreadcrumbLink className="w-15 truncate" onClick={handelClick}>
          {breadcrumb.name}
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
    </div>
  );
};

export default Nav;
