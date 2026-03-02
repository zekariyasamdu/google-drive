import { Spinner } from "~/components/ui/spinner";

const Loading = () => {
  return (
    <div className="mr-auto ml-auto flex h-screen w-full items-center justify-center pt-25">
      <Spinner />
    </div>
  );
};

export default Loading;
