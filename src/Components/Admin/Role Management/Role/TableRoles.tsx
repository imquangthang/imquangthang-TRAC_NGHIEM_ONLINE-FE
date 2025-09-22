import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import {
  fetchAllRoles,
  deleteRole,
} from "../../../../Services/roleService";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Skeleton } from "@mui/material";
import type { Role } from "../../../../Types/role.type";


const TableRoles = forwardRef((props, ref) => {
  const [listRoles, setListRoles] = useState<Role[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentLimit, setCurrentLimit] = useState<number>(6);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handlePageClick = async (event: { selected: number }) => {
    setCurrentPage(event.selected + 1);
  };

  useEffect(() => {
    getAllRoles();
  }, [currentPage, currentLimit]);
  
  useImperativeHandle(ref, () => ({
    fetListRolesAgain: getAllRoles,
  }));

  const getAllRoles = async () => {
    setIsLoading(true);
    try {
      const res = await fetchAllRoles();
      setListRoles(res);
    } catch (error) {
      console.error("Error fetching roles:", error);
      toast.error("Failed to fetch roles");
    }
    setIsLoading(false);
  };

  const handleDeleteRole = async (role: Role) => {
    try {
      const res = await deleteRole(role.id);
      if (res && res.code === 200) {
        toast.success("Xóa role thành công");
        await getAllRoles();
      } else {
        toast.error("Xóa role thất bại");
      }
    } catch (error) {
      console.error("❌ Error deleting role:", error);
      toast.error("Có lỗi xảy ra khi xóa role");
    }
  };

  return (
    <div className="mt-6">
      <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <thead>
          <tr className="border-b  border-gray-200 dark:border-gray-700">
            <th className="p-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
              ID
            </th>
            <th className="p-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
              URL
            </th>
            <th className="p-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
              Description
            </th>
            <th className="p-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <tr
                key={`skeleton-${index}`}
                className="border-b border-gray-200 dark:border-gray-700"
              >
                <td className="p-4">
                  <Skeleton variant="text" width={180} />
                </td>
                <td className="p-4">
                  <Skeleton variant="text" width={100} />
                </td>
                <td className="p-4">
                  <Skeleton variant="text" width={100} />
                </td>
                <td className="p-4">
                  <Skeleton variant="circular" width={24} height={24} />
                </td>
              </tr>
            ))
          ) : listRoles && listRoles.length > 0 ? (
            listRoles.map((item, index) => (
              <tr
                key={`row-${index}`}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="p-4 text-gray-900 dark:text-gray-200">
                  {item.id}
                </td>
                <td className="p-4 text-gray-900 dark:text-gray-200">
                  {item.name}
                </td>
                <td className="p-4 text-gray-900 dark:text-gray-200">
                  {item.description}
                </td>
                <td className="p-4">
                  <button
                    title="Delete"
                    className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-500"
                    onClick={() => handleDeleteRole(item)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} className="text-xl" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="p-4 text-center text-gray-500 dark:text-gray-400"
              >
                Not Found Roles
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 0 && (
        <div className="mt-4 flex justify-center">
          <ReactPaginate
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={totalPages}
            previousLabel="<"
            pageClassName="mx-1"
            pageLinkClassName="px-3 py-1 rounded-lg text-gray-900 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-600 hover:text-white transition-colors"
            previousClassName="mx-1"
            previousLinkClassName="px-3 py-1 rounded-lg text-gray-900 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-600 hover:text-white transition-colors"
            nextClassName="mx-1"
            nextLinkClassName="px-3 py-1 rounded-lg text-gray-900 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-600 hover:text-white transition-colors"
            breakLabel="..."
            breakClassName="mx-1"
            breakLinkClassName="px-3 py-1 rounded-lg text-gray-900 dark:text-gray-200"
            containerClassName="flex items-center"
            activeClassName="bg-blue-500 dark:bg-blue-600 text-white rounded-lg"
            renderOnZeroPageCount={null}
          />
        </div>
      )}
    </div>
  );
});

export default TableRoles;
