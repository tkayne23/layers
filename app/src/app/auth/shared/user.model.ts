export interface UserRegistrationDetails {
  email?: string;
  displayName?: string;
  company?: string;
  username?: string;
  password?: string;
}

export interface UserCredentials {
  username?: string;
  password?: string;
}

export interface User {
  username: string;
  displayName?: string;
  company?: string;
  email?: string;
}