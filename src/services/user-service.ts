import api from '@/lib/axios';

export interface User {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  role?: string | { _id: string; name: string };
  status: 'Active' | 'Inactive' | 'active' | 'inActive';
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserResponse {
  success: boolean;
  message?: string;
  data: User[];
  user?: User; // for single user operations
}

// MOCK DATA for Users
const mockUsers: User[] = [
  { _id: '1', fullName: 'essa essa', email: 'essa@test.com', phoneNumber: '7777777', role: { _id: '2', name: 'Reporter' }, status: 'Active', createdAt: '2026-01-30T20:24:00Z' },
  { _id: '2', fullName: 'Joel', email: 'joel@gmail.com', phoneNumber: '9049885903', role: 'Reporter', status: 'Active', createdAt: '2025-12-28T18:53:00Z' },
  { _id: '3', fullName: 'ANKET KUMAR', email: 'ankit@gmail.com', phoneNumber: '9770683852', role: 'Reporter', status: 'Active', createdAt: '2025-11-29T17:42:00Z' },
  { _id: '4', fullName: 'ashish', email: 'ashish@gmail.com', phoneNumber: '9685748596', role: 'Reporter', status: 'Active', createdAt: '2025-11-14T21:40:00Z' },
  { _id: '6', fullName: 'sanjid', email: '', phoneNumber: '', role: 'Reporter', status: 'Active', createdAt: '2025-07-30T18:05:00Z' },
];

export const userService = {
  /**
   * Fetch all users
   */
  getUsers: async (): Promise<User[]> => {
    try {
      const response = await api.get<{ statusCode: number; message: string; data: User[] }>('/users/fetch-all');
      // The backend structure could be direct array or wrapped. Being defensive.
      if (Array.isArray(response)) return response;
      if (response && Array.isArray(response.data)) return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (response as any)?.users || [];
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  /**
   * Fetch a single user by ID
   */
  getUserById: async (id: string): Promise<User> => {
    try {
      const response = await api.get<{ statusCode: number; message: string; data: User }>(`/users/${id}`);
      
      // Handle potential wrapped response structures
      if ((response as any)?.data) {
        return (response as any).data;
      }
      return response as any;
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create a new user by Admin
   */
  createUser: async (payload: any): Promise<UserResponse> => {
    try {
      console.log('--- Submitting User JSON Payload ---', payload);
      const response = await api.post<UserResponse>('/users/add', payload);
      return response;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  /**
   * Update an existing user
   */
  updateUser: async (id: string, payload: any): Promise<UserResponse> => {
    try {
      console.log(`--- Submitting User Update Payload for ${id} ---`, payload);
      const response = await api.put<UserResponse>(`/users/${id}/update`, payload);
      return response;
    } catch (error) {
      console.error(`Error updating user ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete a user
   */
  deleteUser: async (id: string): Promise<UserResponse> => {
    return new Promise((resolve, reject) => setTimeout(() => {
      const index = mockUsers.findIndex(u => u._id === id);
      if (index > -1) {
        const deleted = mockUsers.splice(index, 1)[0];
        resolve({ success: true, message: 'User deleted successfully', data: mockUsers, user: deleted });
      } else {
        reject(new Error('User not found'));
      }
    }, 800));
  },

  /**
   * Update user status explicitly
   */
  updateStatus: async (id: string, status: 'Active' | 'Inactive'): Promise<UserResponse> => {
    return new Promise((resolve, reject) => setTimeout(() => {
      const index = mockUsers.findIndex(u => u._id === id);
      if (index > -1) {
        mockUsers[index].status = status;
        resolve({ success: true, message: 'User status updated successfully', data: mockUsers, user: mockUsers[index] });
      } else {
        reject(new Error('User not found'));
      }
    }, 500));
  }
};
