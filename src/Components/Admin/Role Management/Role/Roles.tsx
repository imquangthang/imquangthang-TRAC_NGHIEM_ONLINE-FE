import { useRef, useState } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import TableRoles from "./TableRoles";
import { createRoles } from "../../../../Services/roleService";

// Đổi tên interface để tránh trùng với Global Type
interface RoleInputState {
  title: string;
  description: string;
  isValidTitle: boolean; // Sửa lỗi chính tả isValidtitle -> isValidTitle
}

const Role = () => {
  const dataChildDefault: RoleInputState = {
    title: "",
    description: "",
    isValidTitle: true,
  };

  // Sửa type cho ref khớp với tên hàm đã sửa trong TableRoles
  const childRef = useRef<{ fetchListRolesAgain: () => void }>(null);

  const [listChilds, setListChilds] = useState<{
    [key: string]: RoleInputState;
  }>({
    child1: dataChildDefault,
  });

  const handleOnChangeInput = (
    name: "title" | "description",
    value: string,
    key: string
  ) => {
    const _listChilds = _.cloneDeep(listChilds);
    _listChilds[key][name] = value;

    if (value && name === "title") {
      _listChilds[key]["isValidTitle"] = true;
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
    // Giữ lại ít nhất 1 dòng
    if (Object.keys(_listChilds).length > 1) {
      delete _listChilds[key];
      setListChilds(_listChilds);
    }
  };

  const buildDataToPersist = () => {
    const _listChilds = _.cloneDeep(listChilds);
    const result = Object.entries(_listChilds).map(([_key, child]) => {
      return {
        name: child.title,
        description: child.description,
      };
    });
    return result;
  };

  const handleSave = async () => {
    // Validate: Title không được rỗng
    const invalidObj = Object.entries(listChilds).find(
      ([_key, child]) => !child.title
    );

    if (!invalidObj) {
      const data = buildDataToPersist();
      // Gọi API
      const res = await createRoles(data);

      // Giả sử response trả về thành công (bạn cần check res.EC === 0 hoặc tương tự tùy axios interceptor)
      if (res) {
        toast.success("Tạo role thành công");
        // Reload lại bảng
        childRef.current?.fetchListRolesAgain();
        // Reset form
        setListChilds({
          [`child-${uuidv4()}`]: { ...dataChildDefault },
        });
      }
    } else {
      toast.error("Title không được để trống...");
      const _listChilds = _.cloneDeep(listChilds);
      const key = invalidObj[0];
      _listChilds[key]["isValidTitle"] = false;
      setListChilds(_listChilds);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-300 dark:border-gray-600">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Add a New Role
      </h3>
      <div className="space-y-4">
        {Object.entries(listChilds).map(([key, child], _index) => (
          <div key={key} className="flex items-end gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title {/* Sửa từ Url thành Title */}
              </label>
              <input
                type="text"
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                  child.isValidTitle
                    ? "border-gray-300 dark:border-gray-600"
                    : "border-red-500 dark:border-red-400"
                }`}
                value={child.title}
                onChange={(event) =>
                  handleOnChangeInput("title", event.target.value, key)
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
                className="text-green-500 dark:text-green-400 text-xl cursor-pointer hover:text-green-600"
                onClick={handleAddNewInput}
              />
              {Object.keys(listChilds).length > 1 && (
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className="text-red-500 dark:text-red-400 text-xl cursor-pointer hover:text-red-600"
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
