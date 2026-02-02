import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Input } from "~/components/ui/input";
import { auth } from "~/server/auth/auth";
import Image from "next/image";
import DeleteAccountDialog from "~/components/dialogs/delete-account";
import RenameUsernameForm from "~/components/forms/rename-account";
import ChangePassword from "~/components/forms/change-password";
import ChangeProfilePictureDialog from "~/components/dialogs/change-profile-picture";
import DeleteImageDialog from "~/components/dialogs/delete-profile-picture";

const Profile = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/auth/login");
  }

  const profilePicture = session.user.image;
  const name = session.user.name;
  return (
    <div className="bg-background ml-12 flex h-fit w-full flex-col justify-center gap-6 p-4">
      <section className="flex h-fit w-3/5 flex-col">
        <h2 className="text-foreground mb-4 text-xl">Profile Information</h2>
        <div className="border-border grow border-t"></div>
        <div className="space-y-4 pt-3">
          <label className="text-foreground mb-2 block text-sm font-medium">
            Profile Picture
          </label>
          <div className="flex gap-6">
            <Image
              width={200}
              height={100}
              src={profilePicture ?? "/images/no-pfp.jpg"}
              alt="profile picture"
            />
            <ChangeProfilePictureDialog />
            <DeleteImageDialog/>
          </div>

          <RenameUsernameForm initailName={name} />
          <div>
            <label className="text-foreground mb-2 block text-sm font-medium">
              Email Address
            </label>
            <Input
              type="email"
              value={session.user.email}
              disabled
              className="bg-background border-border cursor-not-allowed opacity-50"
            />
            <p className="text-muted-foreground mt-2 text-xs">
              Email cannot be changed
            </p>
          </div>
        </div>
      </section>

      <section className="flex h-fit w-3/5 flex-col">
        <ChangePassword />
      </section>

      <section className="flex h-fit w-3/5 flex-col">
        <h2 className="mb-4 text-lg">Danger Zone</h2>
        <div className="border-border grow border-t"></div>
        <div className="border-destructive/50 flex flex-row items-center justify-between gap-6 space-y-3 rounded-lg border p-4">
          <div>
            <div className="font-bold"> Delete Account</div>
            <div>
              Permanently delete your account and all associated data. This
              action cannot be undone.
            </div>
          </div>
          <DeleteAccountDialog />
        </div>
      </section>
    </div>
  );
};

export default Profile;
