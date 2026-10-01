export interface UserInfo {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
  roles: string[];
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userInfo: UserInfo;
}
