"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { PageData } from "@/services/page-service";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<PageData>[] = [
  {
    accessorKey: "id",
    header: "Sl",
    cell: ({ row }) => <div className="w-[30px]">{row.original.id || row.original._id}</div>,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "language",
    header: "Language",
    cell: ({ row }) => (
      <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800 dark:hover:bg-emerald-900/50">
        {row.getValue("language")}
      </Badge>
    ),
  },
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => <span className="text-muted-foreground">{row.getValue("slug")}</span>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    cell: ({ row }) => {
        const date = row.getValue("createdAt") as string;
        if (!date) return <span className="text-muted-foreground">-</span>;
        
        // Simple formatter, expand based on data shape later if necessary
        return new Date(date).toLocaleDateString();
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
        const status = (row.getValue("status") as string) || "Draft";
        const isPublish = status === "Publish";
        return (
            <Badge 
                className={isPublish ? "bg-emerald-500 hover:bg-emerald-600 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700" : "bg-yellow-500 hover:bg-yellow-600 text-white dark:bg-yellow-600 dark:hover:bg-yellow-700"}
            >
                {status}
            </Badge>
        )
    }
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const page = row.original;
      const id = page.id || page._id;

      return (
        <div className="flex items-center gap-2">
           <Link href={`/page-builder/edit/${id}`}>
             <Button variant="ghost" size="icon" className="h-8 w-8 bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 rounded-md dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/40">
              <Edit className="h-4 w-4" />
            </Button>
           </Link>
          <Button variant="ghost" size="icon" className="h-8 w-8 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 rounded-md dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40">
            <Trash2 className="h-4 w-4" />
          </Button>
          <Link href={`/page-builder/view/${id}`}>
             <Button variant="ghost" size="icon" className="h-8 w-8 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 rounded-md dark:bg-emerald-900/20 dark:text-emerald-400 dark:hover:bg-emerald-900/40">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      );
    },
  },
];
