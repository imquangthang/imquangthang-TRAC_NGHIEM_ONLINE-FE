import instance from "../Setup/axios.ts";
import type { userUpdateByAdmin } from "../Types/user.type.ts";

const fetchAllUsers = (CurrentPage: number, PageSize: number) => {
  return instance.get("/api/user", {
    params: {
      CurrentPage: CurrentPage,
      PageSize: PageSize,
    },
  });
};

const updateUser = (userData: userUpdateByAdmin) => {
  const formData = new FormData();
  formData.append("Id", userData.id.toString()); // cần ép kiểu sang string
  formData.append("FirstName", userData.firstName);
  formData.append("LastName", userData.lastName);
  formData.append("BirthDate", userData.birthDate.toString()); // ISO format
  formData.append("Gender", userData.gender.toString()); // cũng cần string
  console.log("Updating user with data:", formData);

  return instance.put("/api/user", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteUser = (id: number) => {
  return instance.delete(`/api/user/${id}`);
};

export { fetchAllUsers, updateUser, deleteUser };
