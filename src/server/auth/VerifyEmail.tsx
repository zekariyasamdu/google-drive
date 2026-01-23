import { MailCheck } from "lucide-react"
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "~/components/ui/card";

interface VerifyEmailProps {
  username: string;
  verifyUrl: string;
}

export function VerifyEmail({ username, verifyUrl }: VerifyEmailProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <MailCheck className="w-10 h-10 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Welcome, {username}!</CardTitle>
          <CardDescription>
            {"We're excited to have you here. Please verify your email to get started."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button asChild className="w-full" size="lg">
            <a href={verifyUrl}>Verify Email Address</a>
          </Button>
          <p className="text-xs text-muted-foreground">
            {"If you didn't create an account, you can safely ignore this email."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
