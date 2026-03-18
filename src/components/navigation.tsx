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
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink ref={dropRef} onClick={() => route.push(`/${path}`)}>
            My Drive
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {breadcrumbs?.map((item) => (
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
  return (
    <div className="flex items-center gap-1.5">
      <BreadcrumbItem ref={dropRef}>
        <BreadcrumbLink
          className="w-15 truncate"
          onClick={() => route.push(`/${path}/${breadcrumb.id}`)}
        >
          {breadcrumb.name}
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
    </div>
  );
};

export default Nav;
