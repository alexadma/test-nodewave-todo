export interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  content: {
    user: User;
    token: string;
  };
  message: string;
  errors: [];
}