import axios from "axios";
import { API_ENDPOINTS } from "../constants";

export const fetcher = async <T, P extends Record<string, unknown>>(
  url: string,
  params?: P
) => {
  try {
    const response = await axios.get<{ result: T }>(
      `${API_ENDPOINTS.API_BASE_URL}${url}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
        params: {
          ...params,
          store_id: 15641879,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
};
