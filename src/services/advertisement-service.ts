import api from "@/lib/axios";

export interface Advertisement {
  _id: string;
  theme: string;
  page: 'home' | 'category' | 'details' | string;
  position: number;
  adType: 'script' | 'image';
  language: string;
  embedCode?: string;
  adRedirectUrl?: string;
  status: 'Active' | 'Inactive';
  imageUrl?: string;
  image?: File;
  createdAt?: string;
}

interface ApiResponse<T> {
  data: T;
  advertisements?: T;
}

export const advertisementService = {
  getAds: async (): Promise<Advertisement[]> => {
    try {
      const response = await api.get<ApiResponse<Advertisement[]> | Advertisement[]>('/advertisement');
      
      const payload = response as unknown as ApiResponse<Advertisement[]>;
      const data = (payload && typeof payload === 'object' && 'data' in payload) ? payload.data : payload;
      
      if (Array.isArray(data)) return data;
      
      if (payload && typeof payload === 'object' && 'advertisements' in payload) {
        const ads = (payload as { advertisements: Advertisement[] }).advertisements;
        if (Array.isArray(ads)) return ads;
      }
      
      // Fallback mock data if API is empty/not ready
      return [
        {
          _id: "1",
          theme: "Classic",
          page: "home",
          position: 1,
          adType: "image",
          language: "Bengali/Bangla",
          embedCode: "https://newspaper-script.com/demo/newspaper365-laravel/public/uploads/advertise/1730095817_ad_banner.png",
          imageUrl: "https://newspaper-script.com/demo/newspaper365-laravel/public/uploads/advertise/1730095817_ad_banner.png",
          status: "Active"
        },
        {
          _id: "2",
          theme: "Classic",
          page: "home",
          position: 2,
          adType: "image",
          language: "English",
          embedCode: "https://newspaper-script.com/demo/newspaper365-laravel/public/uploads/advertise/1730095817_ad_banner.png",
          imageUrl: "https://newspaper-script.com/demo/newspaper365-laravel/public/uploads/advertise/1730095817_ad_banner.png",
          status: "Active"
        }
      ];
    } catch (error) {
      console.error("Failed to fetch advertisements", error);
      return [];
    }
  },

  createAd: async (ad: Partial<Advertisement>): Promise<Advertisement> => {
    // If it's an image ad with a file, we MUST use FormData
    if (ad.adType === 'image' && ad.image instanceof File) {
      const formData = new FormData();
      Object.entries(ad).forEach(([key, value]) => {
        if (value !== undefined) {
          if (key === 'image') {
            formData.append('image', value as File);
          } else {
            formData.append(key, String(value));
          }
        }
      });
      return api.post<Advertisement>('/advertisement', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    }
    
    // Default JSON post for script ads or other cases
    return api.post<Advertisement>('/advertisement', ad);
  },

  updateAd: async (id: string, updates: Partial<Advertisement>): Promise<Advertisement> => {
    if (updates.adType === 'image' && updates.image instanceof File) {
      const formData = new FormData();
      Object.entries(updates).forEach(([key, value]) => {
        if (value !== undefined) {
          if (key === 'image') {
            formData.append('image', value as File);
          } else {
            formData.append(key, String(value));
          }
        }
      });
      return api.patch<Advertisement>(`/advertisements/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    }
    return api.patch<Advertisement>(`/advertisements/${id}`, updates);
  },

  deleteAd: async (id: string): Promise<boolean> => {
    await api.delete(`/advertisements/${id}`);
    return true;
  }
};
