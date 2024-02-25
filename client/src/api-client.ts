import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const register = async (formData: any) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/v1/users/register`,
    formData,
    { withCredentials: true }
  );
};
