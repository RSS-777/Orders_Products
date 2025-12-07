import type { IOrder } from "../types/order";
const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  console.error("ERROR: VITE_API_URL is missing in your .env file");
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
}

export const getOrders = async (): Promise<IOrdersResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/api/orders/get`, {
      method: "GET",
    });

    if (!response.ok) {
      if (response.status === 500) {
        throw new Error("Server error while fetching orders.");
      }
      throw new Error("Unexpected server response.");
    }

    const data: IOrder[] = await response.json();

    return { success: true, data };

  } catch (err) {
    if (import.meta.env.VITE_APP_MODE === "development") {
      console.error("Error fetching orders:", err);
    }

    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error occurred.",
    };
  }
};

export const deleteOrder = async (id: number, token: string): Promise<IOrderResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/api/orders/${id}/delete`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized. Please log in again.");
      }
      if (response.status === 404) {
        throw new Error("Order not found.");
      }
      if (response.status === 500) {
        throw new Error("Server error while deleting order.");
      }
      throw new Error("Unexpected server response.");
    }

    const data: IOrder = await response.json();

    return { success: true, data };

  } catch (err) {
    if (import.meta.env.VITE_APP_MODE === "development") {
      console.error("Error deleting order:", err);
    }

    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error occurred.",
    };
  }
};

export const createOrder = async (
  token: string,
  order: { title: string; description?: string }
): Promise<IOrderResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/api/orders/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error("Invalid data for creating order.");
      }
      if (response.status === 401) {
        throw new Error("Unauthorized.");
      }
      if (response.status === 500) {
        throw new Error("Server error while creating order.");
      }
      throw new Error("Unexpected server response.");
    }

    const data: IOrder = await response.json();

    return { success: true, data };

  } catch (err) {
    if (import.meta.env.VITE_APP_MODE === "development") {
      console.error("Error creating order:", err);
    }

    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error occurred.",
    };
  }
};