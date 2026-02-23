import api from "@/lib/axios";

export interface Photo {
  _id: string;
  thumbnailUrl?: string; // or however the backend returns it
  url: string; // large image url
  caption: string;
  reference: string;
  dimensions: {
    thumb: { width: number; height: number };
    large: { width: number; height: number };
  };
  createdAt: string;
}

export interface UploadPhotoResponse {
  success: boolean;
  data: Photo;
  message?: string;
}

export interface GetPhotosResponse {
    photos: Photo[];
    totalPages: number;
    currentPage: number;
    totalPhotos: number;
}

export const mediaService = {
  uploadPhoto: async (formData: FormData): Promise<UploadPhotoResponse> => {
    try {
      const response = await api.post<UploadPhotoResponse>('/media/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      console.error("Media upload failed", error);
      throw error;
    }
  },

  getPhotos: async (page = 1, limit = 20): Promise<GetPhotosResponse> => {
    try {
        // Adjust endpoint as per actual backend
      return await api.get<GetPhotosResponse>(`/media?page=${page}&limit=${limit}`);
    } catch (error) {
      console.error("Failed to fetch photos", error);
      throw error;
    }
  },

  deletePhoto: async (id: string): Promise<boolean> => {
    try {
      await api.delete(`/media/${id}`);
      return true;
    } catch (error) {
      console.error("Failed to delete photo", error);
      throw error;
    }
  }
};
