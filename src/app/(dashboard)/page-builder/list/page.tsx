"use client";

import { useState, useEffect } from "react";
import { Filter, Loader2, Plus, RefreshCw } from "lucide-react";
import Link from "next/link";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { pageService, PageData } from "@/services/page-service";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function PageListPage() {
  const [pages, setPages] = useState<PageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await pageService.getPages();
      setPages(data);
    } catch (err) {
      console.error("Failed to load pages", err);
      // Graceful local handling if API isn't live:
      // setError("Failed to load pages. Please try again.");
      setPages([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Page List</h2>
        <div className="flex items-center space-x-2">
           <Button variant="ghost" size="icon" onClick={loadPages} title="Refresh">
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
           <Link href="/page-builder/add">
            <Button className="bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800">
                <Plus className="mr-2 h-4 w-4" />
                Add New Page
            </Button>
           </Link>
          <Button className="bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-64 border rounded-md">
           <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
           <span className="ml-2 text-muted-foreground">Loading pages...</span>
        </div>
      ) : (
        <DataTable columns={columns} data={pages} />
      )}
    </div>
  );
}
