import api from "@/utils/CustomizeApi";

export const register = (username: string, password: string) => {
  return api.post(
    `/api/customer/accounts?username=${encodeURIComponent(
      username
    )}&password=${encodeURIComponent(password)}`
  );
};

export const getAllYachtHome = () => {
  return api.get("/api/customer/allYacht");
};

export const login = (username: string, password: string) => {
  return api.post("/login/signin", {
    username: username,
    password: password,
  });
};

export const getIdCustomer = (idAccount: any) => {
  return api.get(`/api/customer/idCustomer/${idAccount}`);
};
export const findYachtById = (idYacht: any) => {
  return api.get(`/api/customer/findYachtById/${idYacht}`);
};
export const getServiceByYacht = (idYacht: any) => {
  return api.get(`/api/customer/getServiceByYacht/${idYacht}`);
};
export const findRoomByYachtId = (idYacht: any) => {
  return api.get(`/api/customer/getRoomByYacht/${idYacht}`);
};
export const getScheduleByYacht = async (yachtId: any) => {
  try {
    const response = await api.get(
      `/api/customer/getScheduleByYacht/${yachtId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching schedule:", error);
    throw error;
  }
};
export const updateCustomerProfile = (
  idCustomer: string,
  fullName: string,
  email: string,
  phoneNumber: string,
  address: string
) => {
  return api.post(`/api/customer/profile/${idCustomer}`, null, {
    params: { fullName, email, phoneNumber, address },
  });
};
export const bookingRoom = (bookingData: {
  bookingTime?: string;
  amount: number;
  requirement?: string;
  reason?: string;
  status?: string;
  scheduleId: string;
  customerId: string;
  roomIds: string[];
  serviceIds: string[];
  yachtId: string;
}) => {
  return api.post(`/api/customer/bookingRoomOrder`, bookingData);
};
export const getProfileCustomer = (customerId: any) => {
  return api.get(`/api/customer/profile/getProfileCustomerById/${customerId}`);
};
export const bookingRoomOrder = async (data: {
  // bookingTime: string;
  amount: number;
  requirement: string;
  // reason: string;
  // status: string;
  scheduleId: string;
  customerId: string;
  roomIds: string[];
  serviceIds: string[];
  yachtId: string;
}) => {
  try {
    const response = await api.post("/api/customer/bookingRoomOrder", data);
    return response.data;
  } catch (error) {
    console.error("Error booking room:", error);
    throw error;
  }
};
