import { useRef, useState } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import TableRoles from "./TableRoles";
// import { createRoles } from "../../../services/roleService";

// Define the shape of a child item
interface RoleData {
  url: string;
  description: string;
  isValidUrl: boolean;
}

const Role = () => {
  const dataChildDefault: RoleData = {
    url: "",
    description: "",
    isValidUrl: true,
  };

  const childRef = useRef<{ fetListRolesAgain: () => void }>(null);

  const [listChilds, setListChilds] = useState<{ [key: string]: RoleData }>({
    child1: dataChildDefault,
  });

  const handleOnChangeInput = (
    name: "url" | "description",
    value: string,
    key: string
  ) => {
    const _listChilds = _.cloneDeep(listChilds);
    _listChilds[key][name] = value;
    if (value && name === "url") {
      _listChilds[key]["isValidUrl"] = true;
    }
    setListChilds(_listChilds);
  };

  const handleAddNewInput = () => {
    const _listChilds = _.cloneDeep(listChilds);
    _listChilds[`child-${uuidv4()}`] = dataChildDefault;
    setListChilds(_listChilds);
  };

  const handleDeleteInput = (key: string) => {
    const _listChilds = _.cloneDeep(listChilds);
    delete _listChilds[key];
    setListChilds(_listChilds);
  };

  const buildDataToPersist = () => {
    const _listChilds = _.cloneDeep(listChilds);
    const result = Object.entries(_listChilds).map(([key, child]) => {
      const roleChild = child as RoleData;
      return {
        url: roleChild.url,
        description: roleChild.description,
      };
    });
    return result;
  };

  const handleSave = async () => {
    // const invalidObj = Object.entries(listChilds).find(
    //   ([key, child]) => child && !child.url
    // );
    // if (!invalidObj) {
    //   const data = buildDataToPersist();
    //   const res = await createRoles(data);
    //   if (res && res.EC === 0) {
    //     toast.success(res.EM);
    //     childRef.current?.fetListRolesAgain();
    //   }
    // } else {
    //   toast.error("Input URL must not be empty...");
    //   const _listChilds = _.cloneDeep(listChilds);
    //   const key = invalidObj[0];
    //   _listChilds[key]["isValidUrl"] = false;
    //   setListChilds(_listChilds);
    // }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-300 dark:border-gray-600">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Add a New Role
      </h3>
      <div className="space-y-4">
        {Object.entries(listChilds).map(([key, child], index) => (
          <div key={`child-${key}`} className="flex items-end gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                URL
              </label>
              <input
                type="text"
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                  child.isValidUrl
                    ? "border-gray-300 dark:border-gray-600"
                    : "border-red-500 dark:border-red-400"
                }`}
                value={child.url}
                onChange={(event) =>
                  handleOnChangeInput("url", event.target.value, key)
                }
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                value={child.description}
                onChange={(event) =>
                  handleOnChangeInput("description", event.target.value, key)
                }
              />
            </div>
            <div className="flex items-center justify-center gap-2 pb-2">
              <FontAwesomeIcon
                icon={faPlusCircle}
                className="text-green-500 dark:text-green-400 text-xl cursor-pointer"
                onClick={handleAddNewInput}
              />
              {index >= 1 && (
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className="text-red-500 dark:text-red-400 text-xl cursor-pointer"
                  onClick={() => handleDeleteInput(key)}
                />
              )}
            </div>
          </div>
        ))}
        <div>
          <button
            className="px-4 py-2 bg-yellow-500 dark:bg-yellow-600 text-white rounded-lg hover:bg-yellow-600 dark:hover:bg-yellow-700 transition-colors"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          List Current Roles
        </h3>
        <TableRoles ref={childRef} />
      </div>
    </div>
  );
};

export default Role;
