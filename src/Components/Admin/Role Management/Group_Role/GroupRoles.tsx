import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { fetchGroup } from "../../../services/userService";
// import {
//   fetchAllRoles,
//   fetchRolesByGroup,
//   assignRolesToGroup,
// } from "../../../services/roleService";
import _, { cloneDeep } from "lodash";
// import { toast } from "react-toastify";
import { Skeleton } from "@mui/material";

// Define interfaces for data structures
interface Group {
  _id: string;
  name: string;
}

interface Role {
  _id: string;
  url: string;
  description: string;
}

interface AssignedRole {
  _id: string;
  url: string;
  description: string;
  isAssigned: boolean;
}

// interface ApiResponse<T> {
//   EC: number;
//   EM: string;
//   DT: T;
// }

const GroupRole = () => {
  const [userGroups, setUserGroups] = useState<Group[]>([]);
  const [listRoles, setListRoles] = useState<Role[]>([]);
  const [selectGroup, setSelectGroup] = useState<string>("");
  const [assignRolesByGroup, setAssignRolesByGroup] = useState<AssignedRole[]>(
    []
  );
  const [loadingGroups, setLoadingGroups] = useState<boolean>(true);
  const [loadingAssignRoles, setLoadingAssignRoles] = useState<boolean>(true);

  useEffect(() => {
    getGroups();
    getAllRoles();
  }, []);

  const getGroups = async () => {
    // setLoadingGroups(true);
    // try {
    //   const res: ApiResponse<Group[]> = await fetchGroup();
    //   if (res && res.EC === 0) {
    //     setUserGroups(res.DT);
    //   } else {
    //     toast.error(res.EM);
    //   }
    // } catch (error) {
    //   console.error("Error fetching groups:", error);
    //   toast.error("Failed to fetch groups");
    // }
    // setLoadingGroups(false);
  };

  const getAllRoles = async () => {
    // setLoadingGroups(true);
    // try {
    //   const data: ApiResponse<Role[]> = await fetchAllRoles();
    //   if (data && data.EC === 0) {
    //     setListRoles(data.DT);
    //   } else {
    //     toast.error(data.EM);
    //   }
    // } catch (error) {
    //   console.error("Error fetching roles:", error);
    //   toast.error("Failed to fetch roles");
    // }
    // setLoadingGroups(false);
  };

  const handleOnchangeGroup = async (value: string) => {
    // setSelectGroup(value);
    // if (value) {
    //   setLoadingAssignRoles(true);
    //   try {
    //     const data: ApiResponse<Role[]> = await fetchRolesByGroup(value);
    //     if (data && data.EC === 0) {
    //       const result = buildDataRolesByGroup(data.DT, listRoles);
    //       setAssignRolesByGroup(result);
    //     } else {
    //       toast.error(data.EM);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching roles by group:", error);
    //     toast.error("Failed to fetch roles for group");
    //   }
    //   setLoadingAssignRoles(false);
    // } else {
    //   setAssignRolesByGroup([]);
    // }
  };

  // const buildDataRolesByGroup = (
  //   groupRoles: Role[],
  //   allRoles: Role[]
  // ): AssignedRole[] => {
  //   const result: AssignedRole[] = [];
  //   if (allRoles && allRoles.length > 0) {
  //     allRoles.forEach((role) => {
  //       const object: AssignedRole = {
  //         url: role.url,
  //         _id: role._id,
  //         description: role.description,
  //         isAssigned: groupRoles.some((item) => item.url === role.url),
  //       };
  //       result.push(object);
  //     });
  //   }
  //   return result;
  // };

  const handleSelectRole = (value: string) => {
    const _assignRolesByGroup = cloneDeep(assignRolesByGroup);
    const foundIndex = _assignRolesByGroup.findIndex(
      (item) => item._id === value
    );
    if (foundIndex > -1) {
      _assignRolesByGroup[foundIndex].isAssigned =
        !_assignRolesByGroup[foundIndex].isAssigned;
    }
    setAssignRolesByGroup(_assignRolesByGroup);
  };

  const buildDataToSave = () => {
    const result: {
      groupId: string;
      groupRoles: { groupId: string; roleId: string }[];
    } = {
      groupId: selectGroup,
      groupRoles: [],
    };
    const _assignRolesByGroup = cloneDeep(assignRolesByGroup);
    const groupRolesFilter = _assignRolesByGroup.filter(
      (item) => item.isAssigned
    );
    result.groupRoles = groupRolesFilter.map((item) => ({
      groupId: selectGroup,
      roleId: item._id,
    }));
    return result;
  };

  const handleSave = async () => {
    // if (!selectGroup) {
    //   toast.error("Please select a group");
    //   return;
    // }
    // setLoadingGroups(true);
    // try {
    //   const data = buildDataToSave();
    //   const res: ApiResponse<any> = await assignRolesToGroup(data);
    //   if (res && res.EC === 0) {
    //     toast.success(res.EM);
    //   } else {
    //     toast.error(res.EM);
    //   }
    // } catch (error) {
    //   console.error("Error assigning roles to group:", error);
    //   toast.error("Failed to assign roles to group");
    // }
    // setLoadingGroups(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-300 dark:border-gray-600">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Select a Group{" "}
          <span className="text-red-500 dark:text-red-400">*</span>
        </h3>
        <select
          className="w-full max-w-md p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          onChange={(event) => handleOnchangeGroup(event.target.value)}
          value={selectGroup}
        >
          <option value="">Please select your group</option>
          {loadingGroups ? (
            <>
              <option disabled>Loading...</option>
              <option disabled>
                <Skeleton variant="text" width={100} />
              </option>
              <option disabled>
                <Skeleton variant="text" width={100} />
              </option>
            </>
          ) : (
            userGroups.map((item, index) => (
              <option key={`group-${index}`} value={item._id}>
                {item.name}
              </option>
            ))
          )}
        </select>
      </div>
      <hr className="border-gray-200 dark:border-gray-700 mb-6" />
      {selectGroup && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Assign Roles
          </h3>
          {loadingAssignRoles ? (
            <>
              {[...Array(10)].map((_, index) => (
                <div
                  key={`skeleton-role-${index}`}
                  className="flex items-center mb-4"
                >
                  <Skeleton
                    variant="rectangular"
                    width={20}
                    height={20}
                    className="mr-4"
                  />
                  <Skeleton variant="text" width={150} />
                </div>
              ))}
            </>
          ) : (
            assignRolesByGroup.map((item, index) => (
              <div
                key={`list-role-${index}`}
                className="flex items-center mb-4"
              >
                <input
                  type="checkbox"
                  value={item._id}
                  id={`list-role-${index}`}
                  checked={item.isAssigned}
                  onChange={(event) => handleSelectRole(event.target.value)}
                  className="w-5 h-5 text-blue-600 dark:text-blue-400 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400"
                />
                <label
                  htmlFor={`list-role-${index}`}
                  className="ml-3 text-gray-900 dark:text-gray-200"
                >
                  {item.url}
                </label>
              </div>
            ))
          )}
          <div className="mt-4">
            <button
              className="px-4 py-2 bg-yellow-500 dark:bg-yellow-600 text-white rounded-lg hover:bg-yellow-600 dark:hover:bg-yellow-700 transition-colors"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupRole;
