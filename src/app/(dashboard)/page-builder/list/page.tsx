"use client";

import { useState, useEffect, useCallback } from "react";
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

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [pagesData, langsData] = await Promise.all([
         pageService.getPages(),
         import("@/services/language-service").then(m => m.languageService.getLanguages())
      ]);
      
      // Map the language IDs to language names for the table
      const mappedPages = pagesData.map(page => {
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         const langObj: any = page.language;
         const langId = typeof langObj === 'object' && langObj ? langObj._id : langObj;
         const langNameFallback = typeof langObj === 'object' && langObj ? langObj.name : null;

         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         const langMatch = langsData.find((l: any) => l._id === langId || l.name === langId);
         return {
             ...page,
             languageName: langMatch ? langMatch.name : (langNameFallback || langId || "Unknown Language")
         };
      });
      
      setPages(mappedPages);
    } catch (err) {
      console.error("Failed to load pages data", err);
      setPages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Page List</h2>
        <div className="flex items-center space-x-2">
           <Button variant="ghost" size="icon" onClick={loadData} title="Refresh">
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
        <DataTable columns={columns(loadData)} data={pages} />
      )}
    </div>
  );
}
