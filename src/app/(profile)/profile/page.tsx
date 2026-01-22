import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
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
    <div className="flex h-screen bg-background">

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b border-border bg-card p-4">
          <h1 className="text-2xl font-bold text-foreground">Profile Settings</h1>
          <p className="text-muted-foreground text-sm">Manage your account information</p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-2xl space-y-8">

            {/* Profile Information */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Profile Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    className="bg-background border-border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                  <Input
                    type="email"
                    disabled
                    className="bg-background border-border opacity-50 cursor-not-allowed"
                  />
                  <p className="text-xs text-muted-foreground mt-2">Email cannot be changed</p>
                </div>

                <Button  className="w-full bg-primary hover:bg-primary/90">
                  Save Profile
                </Button>
              </div>
            </div>

            {/* Change Password */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Change Password</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Current Password</label>
                  <Input
                    type="password"
                    placeholder="Enter current password"
                    className="bg-background border-border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
                  <Input
                    type="password"
                    placeholder="Enter new password (min 8 characters)"
                    className="bg-background border-border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Confirm New Password</label>
                  <Input
                    type="password"
                    placeholder="Confirm new password"
                    className="bg-background border-border"
                  />
                </div>

                <Button  className="w-full bg-primary hover:bg-primary/90">
                  Change Password
                </Button>
              </div>
            </div>

            {/* Delete Account */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-destructive mb-4">Danger Zone</h2>
              <p className="text-muted-foreground text-sm mb-4">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>

              {!true ? (
                <Button
                  className="w-full bg-destructive hover:bg-destructive/90"
                >
                  Delete Account
                </Button>
              ) : (
                <div className="space-y-3 p-4 bg-destructive/10 rounded-lg border border-destructive/50">
                  <p className="text-destructive font-medium text-sm">Are you sure you want to delete your account?</p>
                  <p className="text-destructive/80 text-xs">This action is permanent and cannot be reversed.</p>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-destructive hover:bg-destructive/90"
                    >
                      Yes, Delete Account
                    </Button>
                    <Button
                      className="flex-1 bg-muted hover:bg-muted/90 text-foreground"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
export default Profile;
