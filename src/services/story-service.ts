import { StoryData } from "@/lib/mock-db";

export type { StoryData };

export const storyService = {
  getStories: async (): Promise<StoryData[]> => {
    const response = await fetch('/api/stories');
    if (!response.ok) throw new Error('Failed to fetch stories');
    return response.json();
  },

  getStoryById: async (id: number | string): Promise<StoryData | undefined> => {
    const response = await fetch(`/api/stories/${id}`);
    if (!response.ok) {
        if (response.status === 404) return undefined;
        throw new Error('Failed to fetch story');
    }
    return response.json();
  },

  createStory: async (story: Omit<StoryData, "id" | "views" | "date">): Promise<StoryData> => {
    const response = await fetch('/api/stories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(story),
    });
    if (!response.ok) throw new Error('Failed to create story');
    return response.json();
  },

  updateStory: async (id: number | string, updates: Partial<StoryData>): Promise<StoryData | null> => {
    const response = await fetch(`/api/stories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error('Failed to update story');
    }
    return response.json();
  },

  deleteStory: async (id: number | string): Promise<boolean> => {
    const response = await fetch(`/api/stories/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
  }
};
