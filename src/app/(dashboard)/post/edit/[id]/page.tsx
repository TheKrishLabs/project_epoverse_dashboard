"use client";

import { useState, useEffect } from "react";
import { PostForm } from "@/components/post-form";
import { postService } from "@/services/post-service";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface EditPostPageProps {
  params: {
    id: string;
  };
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const [post, setPost] = useState<any>(null); // Using any temporarily as PostForm expects specific structure but service returns PostData
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
        try {
            const data = await postService.getPostById(params.id);
            if (data) {
                setPost(data);
            } else {
                setError("Post not found");
            }
        } catch (err) {
            console.error("Failed to load post", err);
            setError("Failed to load post details");
        } finally {
            setLoading(false);
        }
    };
    loadPost();
  }, [params.id]);

  if (loading) {
      return (
          <div className="flex items-center justify-center p-8">
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
       {post && <PostForm initialData={post} isEditing />}
    </div>
  );
}
