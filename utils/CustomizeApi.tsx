import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create({
  baseURL: "http://10.0.2.2:8080",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor để tự động đính kèm token vào request
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("token"); // Lấy token từ AsyncStorage

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error getting token:", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor cho response để xử lý lỗi
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Lỗi phản hồi từ server
      console.error("API Error:", {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers,
      });
    } else if (error.request) {
      // Không nhận được phản hồi từ server
      console.error("API Error: No response received", {
        url: error.config?.url,
        method: error.config?.method,
        request: error.request,
      });
    } else {
      // Lỗi khác (ví dụ: request bị hủy, lỗi mạng,...)
      console.error("API Error: Request setup issue", {
        message: error.message,
        config: error.config,
      });
    }
  }
);

export default api;
