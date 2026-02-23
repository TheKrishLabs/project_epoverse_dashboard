
// Update interface to match user's expected response structure
// { "fullName":..., "email":..., "password":..., "confirmPassword":... }
export interface User {
  id?: string;
  fullName?: string; // Mapped from response
  email: string;
  name?: string; // Kept for compatibility with other components
  role?: string;
  avatar?: string;
}

export interface AuthResponse {
  // flexible response because the user indicated a structured user object might be returned
  // without a explicit "token" field in the example, but generally login endpoints return tokens.
  // We will support both: token in root, or token implied/not present.
  message?: string;
  token?: string;
  user?: User;
  
  // Specific fields from user example
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

// Use Next.js rewrites (configured in next.config.ts) to avoid CORS issues
const API_URL = "/api/auth";

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      console.log(`Attempting login to: ${API_URL}/login`);
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Response Status:", response.status);
      const data = await response.json();
      console.log("Response Data:", data);

      if (!response.ok) {
        throw new Error(data.message || `Login failed with status: ${response.status}`);
      }

      // Handle the token storage.
      // If the API returns a 'token' field, we store it.
      // If NOT, we might need to assume the user IS authenticated if we got a 200 OK and user data.
      
      const tokenToStore = data.token;
      
      // If no token but we have user data, we might generate a dummy one or check headers?
      // For now, let's assume if data.email exists, it's a success.
      
      if (tokenToStore) {
        localStorage.setItem("authToken", tokenToStore);
        document.cookie = `authToken=${tokenToStore}; path=/; max-age=86400; SameSite=Strict`;
      } else if (data.email || data.user?.email || data.user) {
          // Fallback: If the API just returns the user object (flat or nested), we accept it as "logged in"
          // This is not secure for real auth but fits the user's "Specific Response" scenario.
           const dummyToken = "session-active";
           localStorage.setItem("authToken", dummyToken); 
           document.cookie = `authToken=${dummyToken}; path=/; max-age=86400; SameSite=Strict`;
      }

      // Store User Data
      // Map 'fullName' to 'name' for compatibility
      const userData = data.user || data;
      const userToStore: User = {
          email: userData.email,
          name: userData.fullName || userData.name || userData.email?.split('@')[0],
          fullName: userData.fullName,
          // Merge other fields if needed
          ...userData
      };
      
      localStorage.setItem("user", JSON.stringify(userToStore));

      return data;
    } catch (error: unknown) {
      console.error("Login Service Error Detailed:", error);
      const errorMessage = error instanceof Error ? error.message : "Network error. Please try again later.";
      throw new Error(errorMessage);
    }
  },

  signup: async (fullName: string, email: string, password: string, confirmPassword?: string): Promise<AuthResponse> => {
    try {
      console.log(`Attempting signup to: ${API_URL}/register`);
      const payload: { fullName: string; email: string; password: string; confirmPassword?: string } = { fullName, email, password };
      if (confirmPassword) payload.confirmPassword = confirmPassword;

      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("Signup Response Status:", response.status);
      const data = await response.json();
      console.log("Signup Response Data:", data);

      if (!response.ok) {
        throw new Error(data.message || `Signup failed with status: ${response.status}`);
      }

      return data;
    } catch (error: unknown) {
      console.error("Signup Service Error Detailed:", error);
      const errorMessage = error instanceof Error ? error.message : "Network error. Please try again later.";
      throw new Error(errorMessage);
    }
  },

  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    // Clear cookies with all potential path/domain combinations to be safe
    document.cookie = "authToken=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/login";
  },

  getToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("authToken");
    }
    return null;
  },

  isAuthenticated: (): boolean => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      return !!token;
    }
    return false;
  },

  getUser: (): User | null => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          return JSON.parse(userStr);
        } catch (e) {
          console.error("Error parsing user data", e);
          return null;
        }
      }
    }
    return null;
  }
};
