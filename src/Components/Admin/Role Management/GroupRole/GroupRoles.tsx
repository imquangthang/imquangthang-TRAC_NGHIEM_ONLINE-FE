import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Skeleton } from "@mui/material";
import _ from "lodash";
import {
  fetchAllRoles,
  fetchRolesByGroup,
  fetchAllPermissions,
  assignPersToRoles,
} from "../../../../Services/roleService";
import type {
  assignPersToRolesPayload,
  Permission,
} from "../../../../Types/role.type";

interface Group {
  id: number;
  name: string;
  description: string;
}

interface AssignedPermission extends Permission {
  isAssigned: boolean;
}

const GroupRole = () => {
  const [userRole, setUserRole] = useState<Group[]>([]);
  const [listPermisisons, setListPermisisons] = useState<Permission[]>([]);
  const [selectRole, setSelectRole] = useState<number>();
  const [assignPersByRole, setAssignPersByRole] = useState<
    AssignedPermission[]
  >([]);

  const [loadingGroups, setLoadingGroups] = useState<boolean>(true);
  const [loadingAssignRoles, setLoadingAssignRoles] = useState<boolean>(false);

  useEffect(() => {
    getGroups();
    getAllPermissions();
    console.log(assignPersByRole);
  }, [assignPersByRole]);

  const getGroups = async () => {
    setLoadingGroups(true);
    try {
      const res: any = await fetchAllRoles();
      if (res && res.objects) {
        setUserRole(res.objects);
      } else {
        if (Array.isArray(res)) setUserRole(res);
        else toast.error(res.EM || "Error fetching groups");
      }
    } catch (error) {
      console.error("Error fetching groups:", error);
      toast.error("Failed to fetch groups");
    }
    setLoadingGroups(false);
  };

  const getAllPermissions = async () => {
    try {
      const res: any = await fetchAllPermissions();

      if (res && res.objects) {
        setListPermisisons(res.objects);
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
      toast.error("Failed to fetch roles");
    }
  };

  const handleOnchangeGroup = async (groupId: string) => {
    setSelectRole(+groupId);
    setAssignPersByRole([]);
    if (groupId) {
      setLoadingAssignRoles(true);
      try {
        const res: any = await fetchRolesByGroup(+groupId);
        if (res && res.objects) {
          const result = buildDataPermissionByRole(
            res.objects,
            listPermisisons
          );
          setAssignPersByRole(result);
        } else {
          toast.error(res.EM || "Lỗi lấy Roles của Group");
        }
      } catch (error) {
        console.error("Error fetching roles by group:", error);
        toast.error("Failed to fetch roles for group");
      }
      setLoadingAssignRoles(false);
    }
  };

  const buildDataPermissionByRole = (
    groupPermission: Permission[],
    allPermissions: Permission[]
  ): AssignedPermission[] => {
    const result: AssignedPermission[] = [];
    if (allPermissions && allPermissions.length > 0) {
      allPermissions.forEach((pers) => {
        const object: AssignedPermission = {
          ...pers,
          isAssigned: false,
        };

        if (groupPermission && groupPermission.length > 0) {
          object.isAssigned = groupPermission.some(
            (item) => item.id === pers.id
          );
        }

        result.push(object);
      });
    }
    return result;
  };

  const handleSelectRole = (value: string) => {
    const _assignPersByRole = _.cloneDeep(assignPersByRole);
    const foundIndex = _assignPersByRole.findIndex((item) => item.id == +value);

    if (foundIndex > -1) {
      _assignPersByRole[foundIndex].isAssigned =
        !_assignPersByRole[foundIndex].isAssigned;
      setAssignPersByRole(_assignPersByRole);
    }
  };

  const handleSave = async () => {
    // Build data gửi lên server
    const result: assignPersToRolesPayload = {
      roleId: selectRole ? +selectRole : 0,
      permissionIds: assignPersByRole
        .filter((item) => item.isAssigned)
        .map((item) => item.id),
    };
    try {
      const res: any = await assignPersToRoles(result);
      if (res && res.code === 200) {
        toast.success(res.EM || "Gán Role thành công!");
        handleOnchangeGroup(selectRole?.toString() || "");
      } else {
        toast.error(res.EM || "Gán Role thất bại");
      }
    } catch (error) {
      console.error("Error assigning roles to group:", error);
      toast.error("Failed to assign roles to group");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-300 dark:border-gray-600">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Select a Group <span className="text-red-500">*</span>
        </h3>
        <select
          className="w-full max-w-md p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          onChange={(event) => handleOnchangeGroup(event.target.value)}
          value={selectRole}
        >
          <option value="">Please select your group</option>
          {loadingGroups ? (
            <option disabled>Loading groups...</option>
          ) : (
            userRole &&
            userRole.length > 0 &&
            userRole.map((item, index) => (
              <option key={`group-${index}`} value={item.id}>
                {item.name}
              </option>
            ))
          )}
        </select>
      </div>

      <hr className="border-gray-200 dark:border-gray-700 mb-6" />

      {selectRole && (
        <div className="animate-fade-in">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Assign Roles
          </h3>
          {loadingAssignRoles ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} height={40} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">
              {assignPersByRole && assignPersByRole.length > 0 ? (
                assignPersByRole.map((item, index) => (
                  <div
                    key={`list-role-${index}`}
                    className="flex items-start p-3 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                    onClick={() => handleSelectRole(item.id.toString())}
                  >
                    <input
                      type="checkbox"
                      value={item.id}
                      checked={item.isAssigned}
                      onChange={() => {}}
                      className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <div className="ml-3 text-sm">
                      <label className="font-medium text-gray-900 dark:text-gray-300 cursor-pointer">
                        {item.name}
                      </label>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No roles found.
                </p>
              )}
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              className="px-6 py-2 bg-yellow-500 dark:bg-yellow-600 text-white font-medium rounded-lg hover:bg-yellow-600 dark:hover:bg-yellow-700 transition-colors shadow-sm disabled:opacity-50"
              onClick={handleSave}
              disabled={loadingAssignRoles}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupRole;
