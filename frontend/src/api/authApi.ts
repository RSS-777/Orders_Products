export interface ILoginResponse {
  success: boolean;
  token?: string;
  userId?: number;
  photoUrl?: string;
  error?: string;
}

export interface IRegisterResponse {
  success: boolean;
  error?: string;
  message?: string;
}

export const login = async (email: string, password: string): Promise<ILoginResponse> => {
  try {
    const response = await fetch(`/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 400) throw new Error('Отсутствует email или пароль');
      if (response.status === 401) throw new Error('Неверный email или пароль');
      if (response.status === 403) throw new Error('У вас нет прав доступа');
      if (response.status === 500) throw new Error('Внутренняя ошибка сервера');
      throw new Error(data.error || 'Неизвестная ошибка');
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
      error: err instanceof Error ? err.message : 'Неизвестная ошибка',
    };
  }
};

export const register = async (name: string, email: string, password: string): Promise<IRegisterResponse> => {
  try {
    const response = await fetch(`/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 400) throw new Error('Отсутствуют необходимые поля');
      if (response.status === 409) throw new Error('Пользователь с таким email уже существует');
      if (response.status === 500) throw new Error('Внутренняя ошибка сервера');
      throw new Error(data.error || 'Неизвестная ошибка');
    }

    return {
      success: true,
      message: data.message,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Неизвестная ошибка',
    };
  }
};
