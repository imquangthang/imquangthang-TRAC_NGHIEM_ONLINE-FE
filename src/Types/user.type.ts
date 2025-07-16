export interface userState {
  isAuthenticated: boolean;
  Token: string;
  account: {
    Id: string;
    Username: string;
    Role: string;
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
  birthDate: string;
  gender: number;
};
