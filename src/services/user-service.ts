import api from '@/lib/axios';

export interface User {
  _id: string;
  fullName: string;
  email: string;
  mobile?: string;
  role?: string | { _id: string; name: string };
  status: 'Active' | 'Inactive';
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
  { _id: '1', fullName: 'essa essa', email: 'essa@test.com', mobile: '7777777', role: { _id: '2', name: 'Reporter' }, status: 'Active', createdAt: '2026-01-30T20:24:00Z' },
  { _id: '2', fullName: 'Joel', email: 'joel@gmail.com', mobile: '9049885903', role: 'Reporter', status: 'Active', createdAt: '2025-12-28T18:53:00Z' },
  { _id: '3', fullName: 'ANKET KUMAR', email: 'ankit@gmail.com', mobile: '9770683852', role: 'Reporter', status: 'Active', createdAt: '2025-11-29T17:42:00Z' },
  { _id: '4', fullName: 'ashish', email: 'ashish@gmail.com', mobile: '9685748596', role: 'Reporter', status: 'Active', createdAt: '2025-11-14T21:40:00Z' },
  { _id: '6', fullName: 'sanjid', email: '', mobile: '', role: 'Reporter', status: 'Active', createdAt: '2025-07-30T18:05:00Z' },
];

export const userService = {
  /**
   * Fetch all users
   */
  getUsers: async (): Promise<User[]> => {
    return new Promise((resolve) => setTimeout(() => resolve([...mockUsers]), 600));
  },

  /**
   * Fetch a single user by ID
   */
  getUserById: async (id: string): Promise<User> => {
    return new Promise((resolve, reject) => setTimeout(() => {
      const user = mockUsers.find(u => u._id === id);
      if (user) resolve(user);
      else reject(new Error('User not found'));
    }, 500));
  },

  /**
   * Create a new user (multipart/form-data for image)
   */
  createUser: async (formData: FormData): Promise<UserResponse> => {
    try {
      console.log('--- Submitting User FormData ---');
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
      
      const response = await api.post<UserResponse>('/users/add', formData);
      return response;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  /**
   * Update an existing user
   */
  updateUser: async (id: string, formData: FormData): Promise<UserResponse> => {
    return new Promise((resolve, reject) => setTimeout(() => {
      const index = mockUsers.findIndex(u => u._id === id);
      if (index > -1) {
        const updatedUser = { ...mockUsers[index] };
        if (formData.has('fullName')) updatedUser.fullName = formData.get('fullName') as string;
        if (formData.has('email')) updatedUser.email = formData.get('email') as string;
        if (formData.has('mobile')) updatedUser.mobile = formData.get('mobile') as string;
        if (formData.has('role')) updatedUser.role = formData.get('role') as string;
        if (formData.has('status')) updatedUser.status = formData.get('status') as 'Active' | 'Inactive';
        
        const imageFile = formData.get('image');
        if (imageFile instanceof File) {
           updatedUser.image = URL.createObjectURL(imageFile); // Mock image URL for preview
        }

        updatedUser.updatedAt = new Date().toISOString();
        mockUsers[index] = updatedUser;
        resolve({ success: true, message: 'User updated successfully', data: mockUsers, user: updatedUser });
      } else {
        reject(new Error('User not found'));
      }
    }, 800));
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
