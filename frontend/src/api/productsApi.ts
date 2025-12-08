import type { IProduct } from '../types/product';

const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  console.error('ERROR: VITE_API_URL is missing in your .env file');
}

export interface IProductsResponse {
  success: boolean;
  data?: IProduct[];
  error?: string;
}

export interface IProductResponse {
  success: boolean;
  data?: IProduct;
  error?: string;
}

export const getProducts = async (token: string): Promise<IProductsResponse> => {

  try {
    const response = await fetch(`${BASE_URL}/api/products/get`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      if (response.status === 500) {
        throw new Error('Server error while fetching products.');
      }
      throw new Error('Unexpected server response.');
    }

    const res: IProductsResponse = await response.json();

    return {
      success: res.success,
      data: res.data || [],
      error: res.error,
    };
  } catch (err) {
    if (import.meta.env.VITE_APP_MODE === 'development') {
      console.error('Error fetching products:', err);
    }

    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error occurred.',
    };
  }
};

export const deleteProduct = async (id: number, token: string): Promise<IProductResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/api/products/${id}/delete`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized. Please log in again.');
      }
      if (response.status === 404) {
        throw new Error('Product not found.');
      }
      if (response.status === 500) {
        throw new Error('Server error while deleting product.');
      }
      throw new Error('Unexpected server response.');
    }

    const data: IProduct = await response.json();

    return { success: true, data };
  } catch (err) {
    if (import.meta.env.VITE_APP_MODE === 'development') {
      console.error('Error deleting product:', err);
    }

    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error occurred.',
    };
  }
};

export const createProduct = async (product: Partial<IProduct>, token: string): Promise<IProductResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/api/products/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error('Invalid product data.');
      }
      if (response.status === 401) {
        throw new Error('Unauthorized. Please log in again.');
      }
      if (response.status === 500) {
        throw new Error('Server error while creating product.');
      }
      throw new Error('Unexpected server response.');
    }

    const data: IProduct = await response.json();

    return {
      success: true,
      data,
    };
  } catch (err) {
    if (import.meta.env.VITE_APP_MODE === 'development') {
      console.error('Error creating product:', err);
    }

    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error occurred.',
    };
  }
};
