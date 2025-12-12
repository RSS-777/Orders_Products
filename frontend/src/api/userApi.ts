const BASE_URL = import.meta.env.VITE_API_URL;

export interface IUserPhotoUpdateResponse {
  success: boolean;
  data?: {
    photoUrl: string;
  };
  error?: string;
}

export const updateUserPhoto = async (userId: number, file: File, token: string): Promise<IUserPhotoUpdateResponse> => {
  try {
    const formData = new FormData();
    formData.append('photo', file);

    const response = await fetch(`${BASE_URL}/api/users/${userId}/photo`, {
      method: 'PATCH',
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
      data: data.data.photoUrl,
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
