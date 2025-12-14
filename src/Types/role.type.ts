export type Role = {
  id: number;
  name: string;
  description: string;
};

export type Permission = {
  id: number;
  name: string;
};

export type RoleData = {
  id?: number;
  name: string;
  description: string;
};

export type RoleResponse = {
  objects: Role[];
  paging: any;
};

export type PermissionResponse = {
  objects: Permission[];
  paging: any;
};

export type assignPersToRolesPayload = {
  roleId: number;
  permissionIds: number[];
};
