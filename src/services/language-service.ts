import api from "@/lib/axios";

export interface Language {
    _id: string;
    name: string;
    description?: string;
    isDeleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export const languageService = {
  getLanguages: async (): Promise<Language[]> => {
      try {
        const response: any = await api.get('/languages');
        console.log("Raw Language Response Axios Object:", response);
        
        // Extract the JSON body from the Axios response
        const payload = response?.data ? response.data : response;
        console.log("Language JSON Payload:", payload);

        // Handle various backend response wrappers
        if (Array.isArray(payload)) return payload;
        if (payload?.data && Array.isArray(payload.data)) return payload.data;
        if (payload?.languages && Array.isArray(payload.languages)) return payload.languages;
        
        // Fallback: If it's a deeply nested object, find the first array
        if (typeof payload === 'object' && payload !== null) {
            const firstArray = Object.values(payload).find(val => Array.isArray(val));
            if (firstArray) return firstArray as Language[];
        }

        return [];
      } catch (error) {
        console.error("Failed to fetch languages", error);
        throw error;
      }
  },

  createLanguage: async (payload: { name: string; description?: string }): Promise<Language> => {
      try {
          const response = await api.post<Language>('/languages', payload);
          return response;
      } catch (error) {
          console.error("Failed to create language", error);
          throw error;
      }
  },
  
  // Future proofing just in case
  deleteLanguage: async (id: string): Promise<void> => {
      try {
          await api.delete(`/languages/${id}`);
      } catch (error) {
          console.error(`Failed to delete language ${id}`, error);
          throw error;
      }
  }
};
