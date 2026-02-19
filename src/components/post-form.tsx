
"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Sparkles, X, ArrowLeft, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

interface PostData {
    id?: string;
    language: string;
    category: string;
    subCategory: string;
    date?: Date;
    headLine: string;
    shortHead: string;
    content: string;
    reporter: string;
    image: string | null;
    settings: {
        latest: boolean;
        breaking: boolean;
        feature: boolean;
        recommended: boolean;
        publish: boolean;
        schema: boolean;
        social: boolean;
    };
    seo: {
        customUrl: string;
        title: string;
        keyword: string;
        description: string;
        reference: string;
    };
}

interface PostFormProps {
    initialData?: PostData;
    isEditing?: boolean;
}

/*
const DEFAULT_DATA: PostData = {
    language: "",
    category: "",
    subCategory: "",
    headLine: "",
    shortHead: "",
    content: "",
    reporter: "",
    image: null,
    settings: {
        latest: false,
        breaking: false,
        feature: false,
        recommended: false,
        publish: false,
        schema: false,
        social: false
    },
    seo: {
        customUrl: "",
        title: "",
        keyword: "",
        description: "",
        reference: ""
    }
};
*/

export function PostForm({ initialData, isEditing = false }: PostFormProps) {
    const router = useRouter();
    // const data = initialData || DEFAULT_DATA;

    // Initialize state from initialData (which might be flat PostData from service or nested local PostData)
    // We need to handle both or standardize. 
    // Since we are moving to service, initialData passed from Edit page will likely be PostData from service.
    // Let's assume initialData is any for now to handle mapping safely or update interface.
    // But better to update the interface to match what we expect.
    
    // Actually, let's look at how we use it. 
    // If we passed PostData from service, we need to map it back to form state.
    
    const [date, setDate] = useState<Date | undefined>(
        initialData?.date ? new Date(initialData.date) : 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (initialData as any)?.releaseDate ? new Date((initialData as any).releaseDate) : undefined
    );
    const [content, setContent] = useState(initialData?.content || "");
    const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);
    
    // Form State
    const [language, setLanguage] = useState(initialData?.language || "");
    const [category, setCategory] = useState(initialData?.category || "");
    const [subCategory, setSubCategory] = useState(initialData?.subCategory || "");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [headLine, setHeadLine] = useState(initialData?.headLine || (initialData as any)?.title || "");
    const [shortHead, setShortHead] = useState(initialData?.shortHead || "");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [reporter, setReporter] = useState(initialData?.reporter || (initialData as any)?.postBy || "");
    
    // SEO & Settings State
    const [settings, setSettings] = useState(initialData?.settings || {
        latest: false,
        breaking: false,
        feature: false,
        recommended: false,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        publish: (initialData as any)?.status === "Publish",
        schema: false,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        social: (initialData as any)?.socialPost || false
    });
    const [seo, setSeo] = useState(initialData?.seo || {
        customUrl: "",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        title: (initialData as any)?.seoTitle || "",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        keyword: (initialData as any)?.seoKeywords || "",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        description: (initialData as any)?.seoDescription || "",
        reference: ""
    });

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

    const handleSettingChange = (key: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    }
    
    const [isSaving, setIsSaving] = useState(false);

    const handleSeoChange = (key: keyof typeof seo, value: string) => {
         setSeo(prev => ({ ...prev, [key]: value }));
    }

    const handleSubmit = async () => {
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

        setIsSaving(true);

        try {
            // Map form data to service PostData structure
            const serviceData = {
                title: headLine, // Mapping headLine to title
                language,
                category,
                subCategory,
                content,
                image: imagePreview || "",
                seoTitle: seo.title,
                seoDescription: seo.description,
                seoKeywords: seo.keyword,
                postBy: reporter,
                releaseDate: date ? format(date, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
                postDate: format(new Date(), "yyyy-MM-dd"), // Assuming current date for postDate
                status: settings.publish ? "Publish" : "Draft" as "Publish" | "Draft", // correct casting or logic
                socialPost: settings.social,
                // Add other mapped fields if necessary, or update service to accept more
            };

            if (isEditing && initialData?.id) {
                await import("@/services/post-service").then(mod => mod.postService.updatePost(initialData.id!, serviceData));
                alert("Post updated successfully!");
            } else {
                 await import("@/services/post-service").then(mod => mod.postService.createPost(serviceData));
                 alert("Post saved successfully!");
            }
             router.push("/post/list");
        } catch (error) {
            console.error("Failed to save post", error);
            alert("Failed to save post. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between space-y-2">
                 <div className="flex items-center gap-4">
                    {isEditing && (
                         <Link href="/post/list">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                    )}
                    <h2 className="text-3xl font-bold tracking-tight">{isEditing ? "Edit Post" : "Add Post"}</h2>
                </div>
            </div>

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
                <Select value={subCategory} onValueChange={setSubCategory}>
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
                <Input 
                    placeholder="Enter short headline" 
                    value={shortHead}
                    onChange={(e) => setShortHead(e.target.value)}
                />
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
                                {/* eslint-disable-next-line @next/next/no-img-element */}
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
                        <Input 
                            placeholder="custom-url-slug" 
                            value={seo.customUrl}
                            onChange={(e) => handleSeoChange("customUrl", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>SEO Title</Label>
                        <Input 
                            placeholder="SEO Title" 
                            value={seo.title}
                            onChange={(e) => handleSeoChange("title", e.target.value)}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>Meta Keyword</Label>
                    <Input 
                        placeholder="keyword1, keyword2" 
                        value={seo.keyword}
                        onChange={(e) => handleSeoChange("keyword", e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Meta Description</Label>
                    <Textarea 
                        placeholder="Meta description..." 
                        value={seo.description}
                        onChange={(e) => handleSeoChange("description", e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Reference</Label>
                    <Input 
                        placeholder="Source reference" 
                        value={seo.reference}
                        onChange={(e) => handleSeoChange("reference", e.target.value)}
                    />
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
                    {Object.keys(settings).map((key) => (
                         <div key={key} className="flex items-center space-x-2">
                            <Checkbox 
                                id={key} 
                                checked={settings[key as keyof typeof settings]} 
                                onCheckedChange={() => handleSettingChange(key as keyof typeof settings)}
                            />
                            <Label htmlFor={key} className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()} {key === 'social' ? 'Post' : ''}</Label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4">
                <Button size="lg" onClick={handleSubmit} disabled={isSaving}>
                    {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {isSaving ? "Saving..." : (isEditing ? "Update Post" : "Save Post")}
                </Button>
                <Link href="/post/list">
                    <Button variant="outline" size="lg">Cancel</Button>
                </Link>
            </div>
        </div>
    );
}
