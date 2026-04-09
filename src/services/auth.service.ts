import { axiosInstance } from "./axios";
import type { AuthResponse, LoginPayload, RegisterPayload } from "@/types/auth.types";

export const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post<AuthResponse>("/auth/login", payload);
    return data;
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post<AuthResponse>("/auth/register", payload);
    return data;
  },

  me: async () => {
    const { data } = await axiosInstance.get("/auth/me");
    return data;
  },
};