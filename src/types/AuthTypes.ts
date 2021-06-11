export interface UserType {
  token: string,
  user: {
    role: 'admin' | 'guide' | 'lead-guide' | 'user',
    photo: string,
    isVerified: boolean,
    name: string,
    email: string,
    id: string
  }
}

export interface AuthRequestResponse extends UserType {
  status: 'Success' | 'Error',
}

export interface LoginAction extends UserType {
}

export interface LogoutAction {}
