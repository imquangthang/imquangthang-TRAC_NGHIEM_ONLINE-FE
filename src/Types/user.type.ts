export type userState = {
  isAuthenticated: boolean;
  Token: string;
  account: {
    Id: string;
    Username: string;
    Role: string;
    FirstName?: string;
    LastName?: string;
    Gender?: string;
    Birthdate?: string;
  };
};

export type userGetByAdmin = {
  id: string;
  username: string;
  email: string;
  roleId: number;
  createdAt: string;
  createdBy: string;
};

export type userUpdateByAdmin = {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: number;
};
