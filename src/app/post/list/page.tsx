
"use client";

import { Filter } from "lucide-react";
import { columns } from "./columns";
import { posts } from "./data";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";

export default function PostPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Post List</h2>
        <div className="flex items-center space-x-2">
          <Button className="bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>
      <DataTable columns={columns} data={posts} />
    </div>
  );
}
