import axios from 'axios';
import { RegisterFormData } from './pages/Register';
import { LoginFormData } from './pages/Login';
import { ApplierType, OtherProductsType } from '../../server/src/shares/types';
export type Role = 'admin' | 'editor' | 'user' | 'pending';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const register = async (formData: RegisterFormData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/users/register`,
      formData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Register failed');
    }
  }
};

export const login = async (formData: LoginFormData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/auth/login`,
      formData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Login failed');
    }
  }
};

export const validateToken = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/auth/validate-token`,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};

export const logout = async () => {
  try {
    await axios.post(
      `${API_BASE_URL}/api/v1/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    throw new Error('Logout failed');
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/admin/all-users`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};

export const deleteUser = async (id: string) => {
  try {
    await axios.delete(`${API_BASE_URL}/api/v1/admin/user/${id}`, {
      withCredentials: true,
    });
  } catch (error) {
    throw new Error('User delete failed');
  }
};

export const updateUserRole = async (id: string, newUserRole: Role) => {
  try {
    await axios.patch(
      `${API_BASE_URL}/api/v1/admin/user/${id}`,
      { newUserRole },
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Update user failed');
    }
  }
};

export const getAllApplier = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/applier`, {
      withCredentials: true,
    });

    return response?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Somthing went wrog');
    }
  }
};

export const deleteApplierById = async (id: string) => {
  try {
    await axios.delete(`${API_BASE_URL}/api/v1/applier/${id}`, {
      withCredentials: true,
    });
  } catch (error) {
    throw new Error('Applier delete failed');
  }
};

export const updateApplierToDb = async (updatedItem: ApplierType) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/api/v1/applier/update`,
      updatedItem,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Applier update failed');
  }
};

export const analyticsSendOutItemsByYear = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/applier/analytics/group-send-items-by-year`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error('fetching data failed');
  }
};

export const analyticsReceive = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/applier/analytics/group-data-by-receive-status`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error('fetching data failed');
  }
};

export const addAppliersToDB = async (items: ApplierType[]) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/applier`, items, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'add item failed');
    }
  }
};

export const addOtherProductsToDB = async (items: OtherProductsType[]) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/other-products`,
      items,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'add item failed');
    }
  }
};

export const getOtherProducts = async (): Promise<OtherProductsType[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/other-products`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error('fetching data failed');
  }
};

export const deleteOtherProductById = async (id: string) => {
  try {
    await axios.delete(`${API_BASE_URL}/api/v1/other-products/${id}`, {
      withCredentials: true,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'delete item failed');
    }
  }
};

export const updateOtherProductToDb = async (
  updatedItem: OtherProductsType
): Promise<OtherProductsType> => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/api/v1/other-products/update`,
      updatedItem,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Other product update failed');
  }
};
