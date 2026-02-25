import api from "@/lib/axios";
import { PostData } from "@/lib/mock-db";

export type { PostData };


export interface Category {
    _id: string;
    name: string;
    slug?: string;
    status?: string;
}

export interface Article {
    _id: string;
    title?: string;
    headline?: string;
    content: string;
    // They could be returned as nested populated objects or just ID strings
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    category?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    language?: any;
    featuredImage?: string;
    image?: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
}

export const postService = {
  getCategories: async (): Promise<Category[]> => {
      try {
        console.log("Fetching categories from /categories");
        const response = await api.get<Category[]>('/categories');
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

  getArticles: async (): Promise<Article[]> => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response: any = await api.get('/articles');
        if (Array.isArray(response)) return response;
        if (response && Array.isArray(response.data)) return response.data;
        if (response && Array.isArray(response.articles)) return response.articles;
        return [];
      } catch (error) {
        console.error("Failed to fetch articles", error);
        throw error;
      }
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createPost: async (post: any): Promise<any> => {
    // Legacy support or fallback depending on how Dashboard handles it
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return api.post<any>('/posts', post);
  },

  createArticle: async (payload: {
    headline: string;
    content: string;
    slug: string;
    category: string;
    language: string;
    image: string;
    status: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }): Promise<any> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await api.post<any>('/articles', payload);
      return response;
    } catch (error) {
      console.error("Failed to add article", error);
      throw error;
    }
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
