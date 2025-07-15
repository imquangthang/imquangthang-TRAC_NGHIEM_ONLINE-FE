export interface userState {
  isAuthenticated: boolean;
  Token: string;
  account: {
    Username: String;
    Role: String;
  };
}

export type userGetByAdmin = {
  id: string;
  username: string;
  email: string;
  roleId: number;
  createdAt: string;
  updatedAt: string;
};

export type userUpdateByAdmin = {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: String;
  gender: number;
};
