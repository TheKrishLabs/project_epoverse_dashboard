

export interface Role {
  _id: string;
  name: string;
  permissions?: Record<string, string[]>;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface RoleResponse {
  success: boolean;
  message?: string;
  data: Role[];
  role?: Role; // for single role operations
}

import api from '@/lib/axios';

const BASE_URL = '/role-and-permission';

export const roleService = {
  /**
   * Fetch all roles
   */
  getRoles: async (): Promise<Role[]> => {
    try {
      const response = await api.get<RoleResponse>(`${BASE_URL}/fetch-all`);
      return response.data;
    } catch (error) {
      console.error('Error fetching roles:', error);
      throw error;
    }
  },

  /**
   * Fetch a single role by ID
   */
  getRoleById: async (id: string): Promise<Role> => {
    try {
      const response = await api.get<RoleResponse>(`${BASE_URL}/${id}`);
      if (response.role) return response.role;
      return response.data as unknown as Role;
    } catch (error) {
      console.error(`Error fetching role ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create a new role
   */
  createRole: async (data: { name: string; permissions?: Record<string, string[]> }): Promise<RoleResponse> => {
    try {
      const response = await api.post<RoleResponse>(`${BASE_URL}/add`, data);
      return response;
    } catch (error) {
      console.error('Error creating role:', error);
      throw error;
    }
  },

  /**
   * Update an existing role
   */
  updateRole: async (id: string, data: { name: string; permissions?: Record<string, string[]> }): Promise<RoleResponse> => {
    try {
      const response = await api.put<RoleResponse>(`${BASE_URL}/${id}`, data);
      return response;
    } catch (error) {
      console.error(`Error updating role ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete a role
   */
  deleteRole: async (id: string): Promise<RoleResponse> => {
    try {
      const response = await api.delete<RoleResponse>(`${BASE_URL}/${id}`);
      return response;
    } catch (error) {
      console.error(`Error deleting role ${id}:`, error);
      throw error;
    }
  }
};
