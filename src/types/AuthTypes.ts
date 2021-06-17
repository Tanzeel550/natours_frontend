export interface UserType {
  role: 'admin' | 'guide' | 'lead-guide' | 'user';
  photo: string;
  isVerified: boolean;
  name: string;
  email: string;
  id: string;
}

export interface AuthRequestResponse extends UserType {
  status: 'Success' | 'Error';
  token: string;
  user: UserType;
}

export interface LoginAction {
  token: string;
  user: UserType;
}
