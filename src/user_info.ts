export enum Roles {
  admin = 0,
  worker = 1,
  client = 2,
}

interface User {
  created_at: string;
  email: string;
  email_verified_at: null;
  id: number;
  name: string;
  role: number;
  surname: string;
  two_factor_recovery_codes: null;
  two_factor_secret: null;
  updated_at: string;
  tickets: number;
}

export const isLogedIn = (): string | null => {
  return localStorage.getItem('jwt_token');
};

export const getUser = (): User => {
  return JSON.parse(localStorage.getItem('user') ?? '[]');
};
