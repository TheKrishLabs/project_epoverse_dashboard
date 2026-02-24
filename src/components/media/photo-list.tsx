"use client";

import { useState, useEffect, useCallback } from "react";
import { Trash2, Copy } from "lucide-react";
import { format } from "date-fns";

import { mediaService, Photo } from "@/services/media-service";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export function PhotoList() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page] = useState(1);
  
  const fetchPhotos = useCallback(async () => {
    setIsLoading(true);
    setError(false);
    try {
      const data = await mediaService.getPhotos(page, 20); 
      setPhotos(data.photos || []); 
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this photo?")) return;
    
    try {
      await mediaService.deletePhoto(id);
      setPhotos(prev => prev.filter(p => p._id !== id));
      alert("Photo deleted successfully");
    } catch (error) {
       console.error(error);
       alert("Failed to delete photo");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("URL copied to clipboard!");
  }

  if (isLoading && photos.length === 0) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="space-y-2 animate-pulse">
                    <div className="h-48 w-full rounded-md bg-muted" />
                    <div className="h-4 w-3/4 bg-muted" />
                    <div className="h-4 w-1/2 bg-muted" />
                </div>
            ))}
        </div>
    );
  }

  if (error) {
      return (
          <div className="flex flex-col items-center justify-center p-12 text-center">
              <p className="text-red-500 mb-4">Failed to load photos.</p>
              <Button onClick={fetchPhotos}>Try Again</Button>
          </div>
      )
  }

  if (photos.length === 0) {
      return (
          <div className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground border rounded-lg border-dashed">
              <p>No photos found.</p>
          </div>
      )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <Card key={photo._id} className="overflow-hidden group">
            <div className="relative aspect-video bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={photo.thumbnailUrl || photo.url} 
                alt={photo.caption || "Photo"} 
                className="object-cover w-full h-full transition-transform group-hover:scale-105"
              />
            </div>
            <CardContent className="p-4 space-y-2">
               {photo.caption && <p className="font-medium truncate" title={photo.caption}>{photo.caption}</p>}
               <p className="text-xs text-muted-foreground truncate" title={photo.url}>{photo.url}</p>
               <div className="flex justify-between text-xs text-muted-foreground">
                   <span>
                       {photo.dimensions?.large?.width}x{photo.dimensions?.large?.height}
                   </span>
                   <span>
                       {format(new Date(photo.createdAt), 'MMM dd, yyyy')}
                   </span>
               </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between">
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(photo.url)}>
                    <Copy className="h-3 w-3 mr-2" />
                    Copy URL
                </Button>
                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDelete(photo._id)}>
                    <Trash2 className="h-4 w-4" />
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {/* Pagination controls would go here */}
    </div>
  );
}
