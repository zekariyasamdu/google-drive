"use client"
import React from "react"
import { FileItems } from "~/components/cards/file-item";
import { FolderItems } from "~/components/cards/folder-items";
import { useNavigateBreadcrumbs } from "~/hooks/use-navigate-breadcrumbs";

const Dashboard = () => {
  const driveData = useNavigateBreadcrumbs();
  return (
    <div className=" w-full flex flex-row flex-wrap gap-10 pl-10 ml-auto mt-5">
      {driveData.data.folder.map(item => ( <FolderItems data={item} key={item.id} />))}
      {driveData.data.file.map(item => ( <FileItems data={item} key={item.id} />))}
    </div>
  )
}
export default Dashboard;

