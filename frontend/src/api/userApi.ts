const BASE_URL = import.meta.env.VITE_API_URL;

export interface IUserPhotoUpdateResponse {
  success: boolean;
  data?: {
    photoUrl: string;
  };
  error?: string;
}

export interface ILoginResponse {
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
    const response = await fetch(`${BASE_URL}/login`, {
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


export const updateUserPhoto = async (
  userId: number,
  file: File,
  token: string 
): Promise<IUserPhotoUpdateResponse> => {
  try {
    const formData = new FormData();
    formData.append("photo", file);

    const response = await fetch(`${BASE_URL}/users/${userId}/photo`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, 
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      let errorMessage = "Failed to update user photo.";

      if (response.status === 401) {
        errorMessage = "Unauthorized. Please log in again.";
      } else if (response.status === 404) {
        errorMessage = "User not found.";
      } else if (response.status === 500) {
        errorMessage = "Server error while updating user photo.";
      } else if (errorData?.error) {
        errorMessage = errorData.error;
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();

    return {
      success: true,
      data: {
        photoUrl: data.photoUrl, 
      },
    };
  } catch (err) {
    if (import.meta.env.VITE_APP_MODE === "development") {
      console.error("Error updating user photo:", err);
    }

    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error occurred.",
    };
  }
};