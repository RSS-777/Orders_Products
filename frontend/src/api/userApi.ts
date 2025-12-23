export interface IUserPhotoUpdateResponse {
  success: boolean;
  data?: {
    photoUrl: string;
  };
  error?: string;
}

export const updateUserPhoto = async (file: File, token: string): Promise<IUserPhotoUpdateResponse> => {
  try {
    const formData = new FormData();
    formData.append('photo', file);

    const response = await fetch(`/api/users/photo`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 400) throw new Error('Файл не загружен');
      if (response.status === 500) throw new Error('Ошибка сервера');
      throw new Error(data.error || 'Произошла неизвестная ошибка');
    }

    return {
      success: true,
      data: { photoUrl: data.data.photoUrl },
    };
  } catch (err) {
    if (import.meta.env.VITE_APP_MODE === 'development') {
      console.error('Ошибка при обновлении фото пользователя:', err);
    }

    return {
      success: false,
      error: err instanceof Error ? err.message : 'Произошла неизвестная ошибка',
    };
  }
};
