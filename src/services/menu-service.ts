import api from "@/lib/axios";

export interface MenuData {
  _id?: string;
  id?: string;
  name: string;
  location?: string;
  status: 'Publish' | 'Draft';
  items?: MenuItem[];
  createdAt?: string;
}

export interface MenuItem {
  _id?: string;
  id: string; // Unique ID for drag and drop
  menu?: string;
  title: string;
  type: 'category' | 'page' | 'link' | 'archive';
  originalId?: string; // e.g. the Category ID
  referenceId?: string; // used for API reference
  url?: string; // For custom links
  order?: number;
  parentId?: string;
}

// Temporary mock data to fulfill UI requirements before actual backend integration
const mockMenuData: MenuData[] = [
  { id: "menu1", name: "Main Menu", status: "Publish" },
  { id: "menu2", name: "Footer Category", status: "Publish" },
  { id: "menu3", name: "Footer Menu", status: "Publish" },
  { id: "menu4", name: "Footer Page", status: "Draft" },
];

const STORAGE_KEY_PREFIX = 'mock_menu_items_';

export const menuService = {
  getMenus: async (): Promise<MenuData[]> => {
    try {
      // Attempt to hit the actual API if it exists
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await api.get<any>('/menus');
      const data = response.data || response; // Handle both raw axios and intercepted returns

      // If the API returns an empty array but we want to show the mock data for UI building purposes:
      if (!data || !Array.isArray(data) || data.length === 0) {
          return mockMenuData;
      }
      return data as MenuData[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(error: any) {
        // Fallback to mock data if API doesn't exist yet (404 etc)
        console.warn("API '/menus' might not exist or failed. Falling back to mock data.", error);
        return mockMenuData;
    }
  },

  getMenuById: async (id: string): Promise<MenuData | undefined> => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await api.get<any>(`/menus/${id}`);
        return (response.data || response) as MenuData;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        if (error.response?.status === 404) {
            return mockMenuData.find(m => m.id === id || m._id === id);
        }
        throw error;
    }
  },

  createMenu: async (menu: Partial<MenuData>): Promise<MenuData> => {
    return api.post<MenuData>('/menus', menu);
  },

  updateMenu: async (id: string, updates: Partial<MenuData>): Promise<MenuData | null> => {
    try {
        return await api.put<MenuData>(`/menus/${id}`, updates);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
         if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
  },

  deleteMenu: async (id: string): Promise<boolean> => {
    try {
        await api.delete(`/menus/${id}`);
        return true;
    } catch (error) {
        console.warn("Failed to delete menu via API", error);
        return false;
    }
  },

  // Menu Builder Item Endpoints
  getMenuItems: async (menuId: string): Promise<MenuItem[]> => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await api.get<any>(`/menu-items/${menuId}`);
        // Handle both raw axios and intercepted returns
        const data = response.data || response;
        if (Array.isArray(data)) {
            // If the real API kicks online, we might want to clear old local mocks to stop priority blocking
             if (typeof window !== 'undefined') localStorage.removeItem(STORAGE_KEY_PREFIX + menuId);
             return data;
        }
        if (data && Array.isArray(data.items)) return data.items;
        throw new Error("Invalid array return types.");
    } catch (error) {
        // Fallback to local storage for local development testing
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(STORAGE_KEY_PREFIX + menuId);
            if (stored) {
                try {
                    return JSON.parse(stored);
                } catch {
                     // Corrupted local data, fall through to default array
                }
            }
        }
        
        console.warn(`API '/menus/${menuId}/items' failed. Falling back to default initial mock data.`, error);
        return [
            { id: "item-1", title: "Politics", type: "category" },
            { id: "item-2", title: "Business", type: "category" },
            { id: "item-3", title: "External Links", type: "link", url: "https://example.com" }
        ];
    }
  },

  createMenuItem: async (item: Partial<MenuItem>): Promise<MenuItem> => {
    return api.post<MenuItem>('/menu-items', item);
  },

  updateMenuItem: async (id: string, updates: Partial<MenuItem>): Promise<MenuItem> => {
    return api.patch<MenuItem>(`/menu-items/${id}`, updates);
  },

  saveMenuItems: async (menuId: string, items: MenuItem[]): Promise<boolean> => {
    try {
        await api.put(`/menus/${menuId}/items`, { items });
        // Optionally save locally as well just for instant updates
        if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY_PREFIX + menuId, JSON.stringify(items));
        return true;
    } catch (error) {
        console.warn(`Failed to save menu items for ${menuId} via API. Saving to local mock storage.`, error);
        if (typeof window !== 'undefined') {
             localStorage.setItem(STORAGE_KEY_PREFIX + menuId, JSON.stringify(items));
        }
        return true;
    }
  }
};
