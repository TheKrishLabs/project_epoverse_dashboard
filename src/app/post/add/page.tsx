"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Upload, Sparkles, X } from "lucide-react";
import dynamic from "next/dynamic";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

// Dynamic import for ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

export default function AddPostPage() {
  const [date, setDate] = useState<Date>();
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Form State
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");
  const [headLine, setHeadLine] = useState("");
  const [reporter, setReporter] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
      setImagePreview(null);
  }

  const handleSave = () => {
      const newErrors: Record<string, boolean> = {};
      if (!language) newErrors.language = true;
      if (!category) newErrors.category = true;
      if (!date) newErrors.date = true;
      if (!headLine) newErrors.headLine = true;
      if (!reporter) newErrors.reporter = true;

      if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
      }

      // Submit formm
      console.log({ language, category, date, headLine, content, reporter });
      alert("Post saved successfully!");
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Add Post</h2>
      </div>
      <div className="space-y-4">
        {/* Basic Information Section */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <Label className={cn(errors.language && "text-red-500")}>Language <span className="text-red-500">*</span></Label>
            <Select onValueChange={setLanguage} value={language}>
              <SelectTrigger className={cn(errors.language && "border-red-500")}>
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
              </SelectContent>
            </Select>
            {errors.language && <span className="text-xs text-red-500">Required</span>}
          </div>
          <div className="space-y-2">
            <Label className={cn(errors.category && "text-red-500")}>Category <span className="text-red-500">*</span></Label>
            <Select onValueChange={setCategory} value={category}>
              <SelectTrigger className={cn(errors.category && "border-red-500")}>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tech">Technology</SelectItem>
                <SelectItem value="life">Lifestyle</SelectItem>
                <SelectItem value="news">News</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && <span className="text-xs text-red-500">Required</span>}
          </div>
          <div className="space-y-2">
            <Label>Sub Category</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Sub Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ai">AI</SelectItem>
                <SelectItem value="web">Web Dev</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
             <Label className={cn(errors.date && "text-red-500")}>Release Date <span className="text-red-500">*</span></Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                    errors.date && "border-red-500 text-red-500"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.date && <span className="text-xs text-red-500">Required</span>}
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
             <div className="space-y-2">
                <Label>Category Position</Label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Position" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="top">Top</SelectItem>
                        <SelectItem value="feature">Feature</SelectItem>
                    </SelectContent>
                </Select>
             </div>
             <div className="space-y-2">
                <Label>Home Position</Label>
                 <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Position" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="top">Hero</SelectItem>
                        <SelectItem value="sidebar">Sidebar</SelectItem>
                    </SelectContent>
                </Select>
             </div>
        </div>

        <div className="space-y-2">
            <Label>Short Head</Label>
            <Input placeholder="Enter short headline" />
        </div>
        
        <div className="space-y-2">
            <Label className={cn(errors.headLine && "text-red-500")}>Head Line <span className="text-red-500">*</span></Label>
            <Input 
                placeholder="Enter main headline" 
                value={headLine} 
                onChange={(e) => setHeadLine(e.target.value)}
                className={cn(errors.headLine && "border-red-500")}
            />
            {errors.headLine && <span className="text-xs text-red-500">Required</span>}
        </div>

        {/* Details Section */}
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <Label>Details</Label>
                <Button variant="outline" size="sm" className="h-8">
                    <Sparkles className="mr-2 h-4 w-4" />
                    AI Writer
                </Button>
            </div>
            <div className="h-64 pb-12"> {/* Added padding for editor toolbar */}
                <ReactQuill theme="snow" value={content} onChange={setContent} className="h-full" />
            </div>
        </div>

        {/* Media Section */}
        <div className="space-y-2 pt-8">
             <h3 className="text-lg font-medium">Media</h3>
             <div className="grid gap-4 md:grid-cols-2">
                 <div className="space-y-2">
                     <Label>Image Upload</Label>
                     <div className="flex items-center gap-4">
                        <Input type="file" onChange={handleImageChange} accept="image/*" className="cursor-pointer" />
                     </div>
                     {imagePreview && (
                         <div className="relative mt-2 w-40 h-24 rounded-md overflow-hidden border">
                             <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                             <Button
                                variant="destructive"
                                size="icon"
                                className="absolute top-1 right-1 h-6 w-6"
                                onClick={removeImage}
                             >
                                 <X className="h-3 w-3" />
                             </Button>
                         </div>
                     )}
                 </div>
                 <div className="space-y-2">
                     <Label>Video URL</Label>
                     <Input placeholder="https://youtube.com/..." />
                 </div>
             </div>
             <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                     <Label>Image Alt</Label>
                     <Input placeholder="Alt text" />
                  </div>
                  <div className="space-y-2">
                     <Label>Image Title</Label>
                     <Input placeholder="Image title" />
                  </div>
             </div>
        </div>

        {/* SEO Section */}
        <div className="space-y-2">
            <h3 className="text-lg font-medium">SEO</h3>
            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label>Custom URL</Label>
                    <Input placeholder="custom-url-slug" />
                </div>
                <div className="space-y-2">
                    <Label>SEO Title</Label>
                    <Input placeholder="SEO Title" />
                </div>
            </div>
            <div className="space-y-2">
                <Label>Meta Keyword</Label>
                <Input placeholder="keyword1, keyword2" />
            </div>
            <div className="space-y-2">
                <Label>Meta Description</Label>
                <Textarea placeholder="Meta description..." />
            </div>
            <div className="space-y-2">
                <Label>Reference</Label>
                <Input placeholder="Source reference" />
            </div>
        </div>

        {/* Reporter Section */}
        <div className="space-y-2">
            <Label className={cn(errors.reporter && "text-red-500")}>Reporter <span className="text-red-500">*</span></Label>
            <Select onValueChange={setReporter} value={reporter}>
              <SelectTrigger className={cn(errors.reporter && "border-red-500")}>
                <SelectValue placeholder="Select Reporter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="john">John Doe</SelectItem>
                <SelectItem value="jane">Jane Smith</SelectItem>
                <SelectItem value="add_new">+ Add New</SelectItem>
              </SelectContent>
            </Select>
            {errors.reporter && <span className="text-xs text-red-500">Required</span>}
        </div>

        {/* Post Settings */}
        <div className="space-y-2">
             <h3 className="text-lg font-medium">Post Settings</h3>
             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                 <div className="flex items-center space-x-2">
                     <Checkbox id="latest" />
                     <Label htmlFor="latest">Latest Post</Label>
                 </div>
                 <div className="flex items-center space-x-2">
                     <Checkbox id="breaking" />
                     <Label htmlFor="breaking">Breaking Post</Label>
                 </div>
                 <div className="flex items-center space-x-2">
                     <Checkbox id="feature" />
                     <Label htmlFor="feature">Feature Post</Label>
                 </div>
                 <div className="flex items-center space-x-2">
                     <Checkbox id="recommended" />
                     <Label htmlFor="recommended">Recommended Post</Label>
                 </div>
                 <div className="flex items-center space-x-2">
                     <Checkbox id="publish" />
                     <Label htmlFor="publish">Publish</Label>
                 </div>
                 <div className="flex items-center space-x-2">
                     <Checkbox id="schema" />
                     <Label htmlFor="schema">Schema Setup</Label>
                 </div>
                 <div className="flex items-center space-x-2">
                     <Checkbox id="social" />
                     <Label htmlFor="social">Auto Social Post</Label>
                 </div>
             </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-4">
            <Button size="lg" onClick={handleSave}>Save Post</Button>
            <Button variant="outline" size="lg">Cancel</Button>
        </div>
      </div>
    </div>
  );
}
