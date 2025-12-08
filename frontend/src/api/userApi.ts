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

export const updateUserPhoto = async (userId: number, file: File, token: string): Promise<IUserPhotoUpdateResponse> => {
  try {
    const formData = new FormData();
    formData.append('photo', file);

    const response = await fetch(`${BASE_URL}/api/users/${userId}/photo`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 400) throw new Error('File not uploaded');
      if (response.status === 403) throw new Error('You can only update your own photo');
      if (response.status === 500) throw new Error('Internal server error');
      throw new Error(data.error || 'Unknown error');
    }

    return {
      success: true,
      data: {
        photoUrl: data.photoUrl,
      },
    };
  } catch (err) {
    if (import.meta.env.VITE_APP_MODE === 'development') {
      console.error('Error updating user photo:', err);
    }

    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error occurred.',
    };
  }
};

export const getUsers = async (token: string): Promise<IUsersResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/getUsers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 404) throw new Error('User or users not found');
      if (response.status === 403) throw new Error('Access denied');
      if (response.status === 500) throw new Error('Internal server error');
      throw new Error(data.error || 'Unknown error');
    }

    return {
      success: true,
      data: data.users,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
};

export const deleteMyProfile = async (token: string): Promise<IDeleteProfileResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/deleteMyProfile`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 404) throw new Error(data.error || 'User not found');
      if (response.status === 500) throw new Error(data.error || 'Internal server error');
      throw new Error(data.error || 'Unknown error');
    }

    return {
      success: true,
      message: data.message || 'Profile deleted successfully',
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
};
