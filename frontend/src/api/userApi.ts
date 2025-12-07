const BASE_URL = import.meta.env.VITE_API_URL;

export interface IUserPhotoUpdateResponse {
  success: boolean;
  data?: {
    photoUrl: string;
  };
  error?: string;
}

export interface IUsersResponse {
  success: boolean;
  data?: {
    id: number;
    name: string;
    email: string;
    photoUrl?: string;
    role: string;
  }[];
  error?: string;
}

export interface IDeleteProfileResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export const updateUserPhoto = async (
  userId: number,
  file: File,
  token: string 
): Promise<IUserPhotoUpdateResponse> => {
  try {
    const formData = new FormData();
    formData.append("photo", file);

    const response = await fetch(`${BASE_URL}/api/users/${userId}/photo`, {
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

export const getUsers = async (token: string): Promise<IUsersResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/getUsers`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({})
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData?.message || "Failed to fetch users");
    }

    const data = await response.json();
    return {
      success: true,
      data: data.users 
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error"
    };
  }
};

export const deleteMyProfile = async (token: string): Promise<IDeleteProfileResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/deleteMyProfile`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData?.error || "Failed to delete profile");
    }

    const data = await response.json();
    return {
      success: true,
      message: data.message || "Profile deleted successfully",
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error"
    };
  }
};