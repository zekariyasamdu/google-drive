import { Card } from "~/components/ui/card";
import Image from "next/image";
export const dynamic = "force-static";

const AuthUiWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mr-auto ml-auto h-screen w-full pt-25">
      <Card className="short mr-auto ml-auto flex h-fit w-100 flex-row items-center p-3 md:w-150 lg:h-200 lg:w-3/5">
        <Card className="relative inset-0 z-0 hidden h-full w-2/5 grow-0 bg-[url('/images/peacock.jpg')] bg-cover bg-center lg:block">
          <h1 className="absolute bottom-17 left-10 z-20 translate-y-[-50%] text-2xl font-bold">
            Store, Secure and Share
          </h1>
          <div
            className="absolute inset-0 z-10 bg-[linear-gradient(191deg,rgba(0,0,0,0)_46%,rgba(0,0,0,0.8)_65%)]"
            aria-hidden="true"
          />
          <p className="absolute bottom-10 left-10 z-20 translate-y-[-50%] text-sm font-bold text-gray-400">
            by zekariyas amdu
          </p>
        </Card>
        <div className="h-fix flex w-2/6 grow flex-col gap-3 p-5">
          <div className="flex flex-col items-center justify-center gap-3">
            <Image
              className="mx-auto h-auto"
              src={"/images/logo.png"}
              width={100}
              height={100}
              alt="logo"
            />
            <h1 className="text-xl font-bold">Welcome to Z-Keep</h1>
            <p className="text-center">
              Effortless cloud storage designed for the modern web. Store your
              folders, collaborate, and protect your digital content with
              Z-Keep.
            </p>
          </div>
          {children}
        </div>
      </Card>
    </div>
  );
};

export default AuthUiWrapper;
