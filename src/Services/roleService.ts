import instance from "../Setup/axios.ts";
import type { Role, RoleData } from "../Types/role.type.ts";

interface RoleResponse {
  objects: Role[];
  paging: any;
}
const fetchAllRoles = async (): Promise<Role[]> => {
  const res = await instance.get<RoleResponse>("/api/role/role");
  return res.objects;
};

const createOrUpdateRole = (roleData: RoleData) => {
  const formData = new FormData();
  formData.append("Id", roleData.id?.toString() ?? "0");
  formData.append("Title", roleData.title)
  formData.append("Description", roleData.description);

  return instance.post("/api/role", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};


const createRoles = (roles: RoleData[]) => {
  return instance.post("/api/role/role", roles); 
};

const deleteRole = (id: number) => {
  return instance.delete(`/api/role/role/${id}`);
};

export { fetchAllRoles, createOrUpdateRole, createRoles, deleteRole };
