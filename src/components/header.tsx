import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "~/server/auth/auth";
import Image from "next/image";
import SearchInput from "./search-input";
import { DropdownImport } from "./dropdown-menu";
import PhoneNav from "~/components/phone-navbar";

const Header = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/auth/login");
  }
  const profilePicture = session.user.image;
  return (
    <div className="mt-3 ml-4 flex flex-row gap-4">
      <div className="mt-3 ml-4 flex w-fit flex-row items-center gap-4">
        <div className="md:hidden">
          <PhoneNav />
        </div>
        <SearchInput />
      </div>
      <div className="mt-3 mr-3 ml-auto flex gap-5">
        <DropdownImport />
        <div className="h-8 w-8 overflow-hidden rounded-full">
          <Image
            src={profilePicture ?? "/images/no-pfp.jpg"}
            alt="profile picture"
            width={32}
            height={32}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
export default Header;
