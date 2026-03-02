"use client";
import { useEffect } from "react";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { CircleX } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("Dashboard error boundary:", error);
  }, [error]);

  return (
    <div className="flex h-[80vh] w-full items-center justify-center">
      <div className="flex w-[420px] flex-col items-center gap-6 p-8 text-center">
        <div className="text-5xl">
          {<CircleX className="text-red-500" width={300} />}
        </div>

        <div>
          <h2 className="text-xl font-bold">Something went wrong</h2>
          <p className="text-muted-foreground mt-2 text-sm">
            We couldn’t load your dashboard right now. It might be a temporary
            issue.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3">
          <Button onClick={() => reset()} className="w-full">
            Try Again
          </Button>

          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="w-full"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
