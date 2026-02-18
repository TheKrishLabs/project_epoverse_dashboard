
export interface StoryData {
  id: number;
  title: string;
  views: number;
  date: string; // ISO string
  language: string;
  image?: string;
  buttonText?: string;
  buttonLink?: string;
}

export interface PostData {
  id: string; 
  image: string;
  title: string;
  category: string;
  subCategory: string; 
  hit: number; 
  postBy: string; 
  releaseDate: string; 
  postDate: string; 
  language: string;
  status: "Publish" | "Unpublish" | "Draft"; 
  socialPost: boolean; 
  content?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  likes?: number;
  comments?: number;
}

// Initial Mock Data for Stories
export const STORIES: StoryData[] = Array.from({ length: 27 }).map((_, i) => ({
  id: i + 1,
  title: `Story Title ${i + 1}: The quick brown fox jumps over the lazy dog`,
  views: Math.floor(Math.random() * 5000),
  date: new Date(2024, 4, 20 - (i % 20), 10 + (i % 12), 30).toISOString(),
  language: i % 3 === 0 ? "English" : i % 3 === 1 ? "Hindi" : "Tamil",
  image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=60",
  buttonText: "Read More",
  buttonLink: "https://example.com"
}));

// Initial Mock Data for Posts
export const POSTS: PostData[] = Array.from({ length: 25 }).map((_, i) => ({
  id: (i + 1).toString(),
  image: "https://images.unsplash.com/photo-1499750310159-52f0f837ce30?w=800&auto=format&fit=crop&q=60",
  title: `Post Title ${i + 1}: Importance of Web Development in 2024`,
  category: i % 3 === 0 ? "Technology" : i % 3 === 1 ? "Lifestyle" : "Business",
  subCategory: i % 3 === 0 ? "AI" : i % 3 === 1 ? "Travel" : "Finance",
  hit: Math.floor(Math.random() * 2000),
  postBy: "John Doe",
  releaseDate: "2023-10-25",
  postDate: "2023-10-24",
  language: i % 2 === 0 ? "English" : "Hindi",
  status: i % 5 === 0 ? "Draft" : i % 2 === 0 ? "Publish" : "Unpublish",
  socialPost: i % 2 === 0,
  content: "<p>This is some <strong>bold</strong> content for the post.</p>",
  seoTitle: `Post Title ${i + 1}`,
  seoDescription: "A great post about web development.",
  seoKeywords: "web, dev, 2024",
  likes: Math.floor(Math.random() * 200),
  comments: Math.floor(Math.random() * 50)
}));
