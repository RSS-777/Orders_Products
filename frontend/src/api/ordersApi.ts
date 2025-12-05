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
    const response = await fetch(`${BASE_URL}/orders`, {
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


export const getOrderById = async (id: number): Promise<IOrderResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/orders/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Order not found.");
      }
      if (response.status === 500) {
        throw new Error("Server error while fetching order.");
      }
      throw new Error("Unexpected server response.");
    }

    const data: IOrder = await response.json();

    return { success: true, data };

  } catch (err) {
    if (import.meta.env.VITE_APP_MODE === "development") {
      console.error("Error fetching order:", err);
    }

    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error occurred.",
    };
  }
};

export const deleteOrder = async (id: number): Promise<IOrderResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/orders/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
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
