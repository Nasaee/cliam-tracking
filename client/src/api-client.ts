import axios from 'axios';
import { RegisterFormData } from './pages/Register';
import { LoginFormData } from './pages/Login';

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
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/admin/all-users`,
      {},
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};
