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

export const login = async (email: string, password: string): Promise<ILoginResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 400) throw new Error('Email or password is missing');
      if (response.status === 401) throw new Error('Invalid credentials');
      if (response.status === 500) throw new Error('Internal server error');
      throw new Error(data.error || 'Unknown error');
    }

    return {
      success: true,
      token: data.data.token,
      userId: data.data.userId,
      photoUrl: data.data.photoUrl,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
};

export const register = async (name: string, email: string, password: string): Promise<IRegisterResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 400) throw new Error('Email or password is missing');
      if (response.status === 401) throw new Error('Invalid credentials');
      if (response.status === 500) throw new Error('Internal server error');
      throw new Error(data.error || 'Unknown error');
    }

    return {
      success: true,
      token: data.data.token,
      userId: data.data.userId,
      photoUrl: data.data.photoUrl,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
};
