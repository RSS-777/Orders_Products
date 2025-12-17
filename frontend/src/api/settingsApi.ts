const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  console.error('ERROR: VITE_API_URL is missing in your .env file');
}

export interface ICurrencyResponse {
  success: boolean;
  data?: { defaultCurrency: string };
  error?: string;
  message?: string;
}

export const getDefaultCurrency = async (token: string): Promise<ICurrencyResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/api/settings/currency`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) throw new Error('Не авторизован. Пожалуйста, войдите снова');
      if (response.status === 500) throw new Error('Ошибка сервера при получении валюты');
      throw new Error('Неожиданный ответ сервера');
    }

    const res: ICurrencyResponse = await response.json();
    return {
      success: res.success,
      data: res.data,
      error: res.error,
      message: res.message,
    };
  } catch (err) {
    if (import.meta.env.VITE_APP_MODE === 'development') {
      console.error('Error fetching default currency:', err);
    }
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Произошла неизвестная ошибка',
    };
  }
};

export const updateDefaultCurrency = async (currency: string, token: string): Promise<ICurrencyResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/api/settings/currency`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ currency }),
    });

    if (!response.ok) {
      if (response.status === 400) throw new Error('Валюта не указана');
      if (response.status === 401) throw new Error('Не авторизован. Пожалуйста, войдите снова');
      if (response.status === 403) throw new Error('Доступ запрещен');
      if (response.status === 500) throw new Error('Ошибка сервера при обновлении валюты');
      throw new Error('Неожиданный ответ сервера');
    }

    const res: ICurrencyResponse = await response.json();
    return {
      success: res.success,
      message: res.message,
      error: res.error,
      data: res.data,
    };
  } catch (err) {
    if (import.meta.env.VITE_APP_MODE === 'development') {
      console.error('Error updating default currency:', err);
    }
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Произошла неизвестная ошибка',
    };
  }
};
