import { headers } from "next/headers";
import { redirect } from "next/navigation";
import UploadZone from "~/components/button/dropzone";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { auth } from "~/server/auth/auth-server";

const Profile = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/auth/login");
  }
  const userId = session.user.id;

  return (
    <div className="bg-background ml-12 flex h-fit w-full flex-col justify-center gap-6 p-4">
      <section className="flex h-fit w-3/5 flex-col">
        <h2 className="text-foreground mb-4 text-xl">Profile Information</h2>
        <div className="border-border grow border-t"></div>
        <div className="space-y-4 pt-3">
          <div className="flex gap-6">
            <Card className="h-56 w-1/2"></Card>
            <UploadZone/>
          </div>
          <div>
            <label className="text-foreground mb-2 block text-sm font-medium">
              Full Name
            </label>
            <div className="flex gap-6">
              <Input type="text" placeholder="Enter your full name" />
              <Button>Rename</Button>
            </div>
          </div>

          <div>
            <label className="text-foreground mb-2 block text-sm font-medium">
              Email Address
            </label>
            <Input
              type="email"
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
        <h2 className="text-foreground mb-4 text-lg">Change Password</h2>
        <div className="border-border grow border-t"></div>
        <div className="space-y-4 pt-3">
          <div>
            <label className="text-foreground mb-2 block text-sm font-medium">
              Current Password
            </label>
            <Input
              type="password"
              placeholder="Enter current password"
              className="bg-background border-border"
            />
          </div>

          <div>
            <label className="text-foreground mb-2 block text-sm font-medium">
              New Password
            </label>
            <Input
              type="password"
              placeholder="Enter new password (min 8 characters)"
              className="bg-background border-border"
            />
          </div>

          <div>
            <label className="text-foreground mb-2 block text-sm font-medium">
              Confirm New Password
            </label>
            <Input
              type="password"
              placeholder="Confirm new password"
              className="bg-background border-border"
            />
          </div>

          <Button className="bg-primary hover:bg-primary/90 w-full">
            Change Password
          </Button>
        </div>
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
          <Button className="bg-destructive">Delete</Button>
        </div>
      </section>
    </div>
  );
};

export default Profile;
