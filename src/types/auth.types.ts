export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  confirm_password: string;
  email: string;
  full_name: string;
}

export interface AuthData {
  username: string;
  email: string;
  fullName: string;
  roles: string[];
  accessToken: string;
}

export interface AuthResponse {
  status: number;
  data: {
    accessToken: string;
    roles: ("user" | "admin")[];
  };
  message: string;
}
