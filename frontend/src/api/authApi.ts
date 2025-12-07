const BASE_URL = import.meta.env.VITE_API_URL;

export interface ILoginResponse {
  success: boolean;
  token?: string;
  userId?: number;
  photoUrl?: string;
  error?: string;
}

export interface IRegisterResponse {
  success: boolean;
  token?: string;
  userId?: number;
  photoUrl?: string;
  error?: string;
}

export const login = async (
  email: string,
  password: string
): Promise<ILoginResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      if (response.status === 401) throw new Error("Invalid credentials.");
      throw new Error("Server error.");
    }

    const data = await response.json();

    return {
      success: true,
      token: data.token,
      userId: data.userId,
      photoUrl: data.photoUrl
    };

  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
};

export const register = async (name: string, email: string, password: string): Promise<IRegisterResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Server error");
    }

    const data = await response.json();
    return {
      success: true,
      token: data.token,
      userId: data.userId,
      photoUrl: data.photoUrl
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error"
    };
  }
};