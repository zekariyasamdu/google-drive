import { MailCheck } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";

export function VerifyEmail({
  username,
  verifyUrl,
}: {
  username: string;
  verifyUrl: string;
}) {
  return (
    <div className="flex min-h-[400px] items-center justify-center p-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader>
          <div className="mb-4 flex justify-center">
            <div className="bg-primary/10 rounded-full p-3">
              <MailCheck className="text-primary h-10 w-10" />
            </div>
          </div>
          <CardTitle className="text-2xl">Welcome, {username}!</CardTitle>
          <CardDescription>
            {
              "We're excited to have you here. Please verify your email to get started."
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button asChild className="w-full" size="lg">
            <a href={verifyUrl}>Verify Email Address</a>
          </Button>
          <p className="text-muted-foreground text-xs">
            {
              "If you didn't create an account, you can safely ignore this email."
            }
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
