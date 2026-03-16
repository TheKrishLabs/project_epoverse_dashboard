"use client";

import { useState, useEffect } from "react";
import { CategoryForm } from "@/components/category-form";
import { postService, Category } from "@/services/post-service";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface EditCategoryPageProps {
  params: {
    id: string;
  };
}

export default function EditCategoryPage({ params }: EditCategoryPageProps) {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategory = async () => {
        try {
            // We don't have a direct getCategoryById yet in the service, 
            // but we can find it from the list for now if needed.
            // However, the backend likely supports GET /categories/:id
            // Let's assume there's a way or use list if small.
            // Checking existing postService methods... it has getCategories.
            const categories = await postService.getCategories();
            const found = categories.find(c => c._id === params.id);
            
            if (found) {
                setCategory(found);
            } else {
                setError("Category not found");
            }
        } catch (err) {
            console.error("Failed to load category", err);
            setError("Failed to load category details");
        } finally {
            setLoading(false);
        }
    };
    loadCategory();
  }, [params.id]);

  if (loading) {
      return (
          <div className="flex items-center justify-center p-8 h-[400px]">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
      );
  }

  if (error) {
      return (
        <div className="p-8">
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        </div>
      )
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
       {category && <CategoryForm initialData={category} isEditing />}
    </div>
  );
}
