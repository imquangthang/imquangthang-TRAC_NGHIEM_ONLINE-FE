import instance from "../Setup/axios.ts";
import type {
  assignPersToRolesPayload,
  PermissionResponse,
  RoleData,
  RoleResponse,
} from "../Types/role.type.ts";

const fetchAllRoles = () => {
  return instance.get<RoleResponse>("/api/role/role");
};

const fetchAllPermissions = () => {
  return instance.get<PermissionResponse>("/api/role/all-permission");
};

const createOrUpdateRole = (roleData: RoleData) => {
  const formData = new FormData();
  formData.append("Id", roleData.id?.toString() ?? "0");
  formData.append("Name", roleData.name);
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

const fetchRolesByGroup = (groupId: number) => {
  return instance.get<RoleResponse>(`/api/role/permission?roleId=${groupId}`);
};

const assignPersToRoles = (data: assignPersToRolesPayload) => {
  return instance.post("/api/role/role-permission", data);
};

export {
  fetchAllRoles,
  createOrUpdateRole,
  createRoles,
  deleteRole,
  fetchRolesByGroup,
  fetchAllPermissions,
  assignPersToRoles,
};
