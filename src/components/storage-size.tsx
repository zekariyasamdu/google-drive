import { CardDescription } from "./ui/card";
import { Progress } from "./ui/progress";

export default function StorageSize() {
  return (
    <div className="w-full h-fit flex flex-col gap-2">
      <CardDescription>Storage</CardDescription>
      <Progress value={10}/>
      <CardDescription>10MB of 100MB used</CardDescription>
    </div>
  )
}

