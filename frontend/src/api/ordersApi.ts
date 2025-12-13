import type { IOrder } from '../types/order';

const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  console.error('ERROR: VITE_API_URL is missing in your .env file');
}

export interface IOrdersResponse {
  success: boolean;
  data?: IOrder[];
  error?: string;
}

export interface IOrderResponse {
  success: boolean;
  data?: IOrder;
  error?: string;
  message?: string;
}

interface IDeleteOrderResponse {
  success: boolean;
  data?: IOrder;
  error?: string;
}

export const getOrders = async (token: string): Promise<IOrdersResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/api/orders/get`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data: IOrdersResponse = await response.json();

    if (!response.ok) {
      if (response.status === 500) throw new Error(data.error || 'Ошибка сервера при получении заказов');
      throw new Error(data.error || 'Неожиданный ответ сервера');
      
    }

    if (!data.success) {
      throw new Error(data.error || 'Не удалось получить заказы');
    }

    return { success: true, data: data.data };
  } catch (err) {
    if (import.meta.env.VITE_APP_MODE === 'development') {
      console.error('Ошибка при получении заказов', err);
    }

    return {
      success: false,
      error: err instanceof Error ? err.message : 'Произошла неизвестная ошибка',
    };
  }
};

export const deleteOrder = async (id: number, token: string): Promise<IDeleteOrderResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/api/orders/${id}/delete`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result: IDeleteOrderResponse = await response.json();

    if (!response.ok) {
      if (response.status === 401) throw new Error('Не авторизован. Пожалуйста, войдите снова');
      if (response.status === 404) throw new Error('Заказ не найден');
      if (response.status === 500) throw new Error('Ошибка сервера при удалении заказа');
      throw new Error(result.error || 'Неожиданный ответ сервера');
    }

    if (!result.success) {
      throw new Error(result.error || 'Не удалось удалить заказ');
    }

    return { success: true, data: result.data };
  } catch (err) {
    if (import.meta.env.VITE_APP_MODE === 'development') {
      console.error('Error deleting order:', err);
    }

    return {
      success: false,
      error: err instanceof Error ? err.message : 'Произошла неизвестная ошибка',
    };
  }
};

export const createOrder = async (token: string, order: { title: string; description?: string }): Promise<IOrderResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/api/orders/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(order),
    });

    const result: IOrderResponse = await response.json();

    if (!response.ok) {
      if (response.status === 400) throw new Error(result.error || 'Неверные данные для создания заказа');
      if (response.status === 401) throw new Error(result.error || 'Не авторизован');
      if (response.status === 500) throw new Error(result.error || 'Ошибка сервера при создании заказа');
      throw new Error(result.error || 'Неожиданный ответ сервера');
    }

    if (!result.success) {
      throw new Error(result.error || 'Не удалось создать заказ');
    }

    return { success: true, message: 'Заказ успешно создан' };
  } catch (err) {
    if (import.meta.env.VITE_APP_MODE === 'development') {
      console.error('Error creating order:', err);
    }

    return {
      success: false,
      error: err instanceof Error ? err.message : 'Произошла неизвестная ошибка',
    };
  }
};
