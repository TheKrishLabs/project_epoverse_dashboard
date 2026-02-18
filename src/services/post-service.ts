import { PostData } from "@/lib/mock-db";

export type { PostData };

export const postService = {
  getPosts: async (): Promise<PostData[]> => {
    const response = await fetch('/api/posts');
    if (!response.ok) throw new Error('Failed to fetch posts');
    return response.json();
  },

  getPostById: async (id: string): Promise<PostData | undefined> => {
    const response = await fetch(`/api/posts/${id}`);
    if (!response.ok) {
        if (response.status === 404) return undefined;
        throw new Error('Failed to fetch post');
    }
    return response.json();
  },

  createPost: async (post: Omit<PostData, "id" | "hit" | "likes" | "comments" | "releaseDate" | "postDate" | "postBy" | "status" | "socialPost">): Promise<PostData> => {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (!response.ok) throw new Error('Failed to create post');
    return response.json();
  },

  updatePost: async (id: string, updates: Partial<PostData>): Promise<PostData | null> => {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error('Failed to update post');
    }
    return response.json();
  },

  deletePost: async (id: string): Promise<boolean> => {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
  }
};
