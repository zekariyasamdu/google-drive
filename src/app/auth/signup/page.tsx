import SignupForm from "~/components/forms/signup";
import  { Card } from "~/components/ui/card";
import Image from "next/image";

const Page = () => {
  return (
    <div className="ml-auto mr-auto h-screen w-full pt-25 ">
      <Card className="flex flex-row items-center ml-auto mr-auto h-4/5 w-3/5 bg-red p-3">
        <Card className="relative w-2/5 h-full grow-0 inset-0 z-0 bg-[url('/images/peacock.jpg')] bg-cover bg-center ">
          <h1 className="absolute z-20 font-bold left-10 bottom-17 translate-y-[-50%] text-2xl">Store, Secure and Share</h1>
          <div
            className="absolute inset-0 z-10 bg-[linear-gradient(191deg,rgba(0,0,0,0)_46%,rgba(0,0,0,0.8)_65%)]"
            aria-hidden="true"
          />
          <p className="absolute z-20 font-bold left-10 bottom-10 translate-y-[-50%] text-sm text-gray-400">by zekariyas amdu</p>
        </Card>
        <div className="flex flex-col grow gap-3 w-2/6 p-5 h-fix ">
          <div className="flex flex-col gap-3 items-center justify-center">
            <Image className="mx-auto" src={"/images/logo.png"} width={100} height={100} alt="logo" />
            <h1 className="font-bold text-xl">Welcome to Z-Keep</h1>
            <p className="text-center">Effortless cloud storage designed for the modern web. Store your folders, collaborate, and protect your digital content with Z-Keep.</p>
          </div>
          <SignupForm />
        </div>
      </Card>
    </div>
  );
};



export default Page;
