import api from "@/lib/axios";

export interface PageData {
    id?: string;
    _id?: string;
    language: string;
    title: string;
    slug: string;
    details: string;
    photo: string | null;
    videoUrl: string;
    metaKeyword: string;
    metaDescription: string;
    status?: string;
    createdAt?: string;
}

export const pageService = {
  getPages: async (): Promise<PageData[]> => {
    return api.get<PageData[]>('/pages');
  },

  getPageById: async (id: string): Promise<PageData | undefined> => {
    try {
        return await api.get<PageData>(`/pages/${id}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            return undefined;
        }
        throw error;
    }
  },

  createPage: async (page: Partial<PageData>): Promise<PageData> => {
    return api.post<PageData>('/pages', page);
  },

  updatePage: async (id: string, updates: Partial<PageData>): Promise<PageData | null> => {
    try {
        return await api.put<PageData>(`/pages/${id}`, updates);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
         if (error.response && error.response.status === 404) {
            return null;
        }
        throw error;
    }
  },

  deletePage: async (id: string): Promise<boolean> => {
    await api.delete(`/pages/${id}`);
    return true;
  }
};
