"use client";
import { usePathname, useRouter } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

const Nav = ({
  breadcrumbs,
}: {
  breadcrumbs: { id: number; name: string }[];
}) => {
  const route = useRouter();
  const currentPath = usePathname();
  const pathArray = currentPath.split("/");
  const path = pathArray[1] ?? "star";
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink onClick={() => route.push(`/${path}`)}>
            My Drive
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {breadcrumbs?.map((item) => (
          <div className="flex items-center gap-1.5" key={item.id}>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => route.push(`/${path}/${item.id}`)}>
                {item.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Nav;
