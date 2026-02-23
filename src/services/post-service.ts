import api from "@/lib/axios";
import { PostData } from "@/lib/mock-db";

export type { PostData };

export interface Language {
    _id: string;
    name: string;
    isDeleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export interface Category {
    _id: string;
    name: string;
    slug?: string;
    status?: string;
}

export const postService = {
  getLanguages: async (): Promise<Language[]> => {
      try {
        console.log("Fetching languages from /language/fetch-all");
        const response = await api.get<Language[]>('/language/fetch-all');
        console.log("Raw API Response:", response);
        return response || [];
      } catch (error) {
        console.error("Failed to fetch languages", error);
        throw error;
      }
  },

  getCategories: async (): Promise<Category[]> => {
      try {
        console.log("Fetching categories from /categories/fetch-all");
        const response = await api.get<Category[]>('/categories/fetch-all');
        console.log("Raw Categories Response:", response);
        return response || [];
      } catch (error) {
        console.error("Failed to fetch categories", error);
        throw error;
      }
  },

  getPosts: async (): Promise<PostData[]> => {
    return api.get<PostData[]>('/posts');
  },

  getPostById: async (id: string): Promise<PostData | undefined> => {
    try {
        return await api.get<PostData>(`/posts/${id}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            return undefined;
        }
        throw error;
    }
  },

  createPost: async (post: Omit<PostData, "id" | "hit" | "likes" | "comments" | "releaseDate" | "postDate" | "postBy" | "status" | "socialPost">): Promise<PostData> => {
    return api.post<PostData>('/posts', post);
  },

  updatePost: async (id: string, updates: Partial<PostData>): Promise<PostData | null> => {
    try {
        return await api.put<PostData>(`/posts/${id}`, updates);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
         if (error.response && error.response.status === 404) {
            return null;
        }
        throw error;
    }
  },

  deletePost: async (id: string): Promise<boolean> => {
    await api.delete(`/posts/${id}`);
    return true;
  }
};
