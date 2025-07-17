import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchAllUsers } from "../../../Services/userServices";
import type { userGetByAdmin } from "../../../Types/user.type";
import ModalUpdateUser from "./modalUpdateUser";
import ModalDelUser from "./modalDelUser";
import Header from "../../Header/header";

const UserManagement = () => {
  const user = useSelector((state: any) => state.user) || {};
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [listUsers, setListUsers] = useState<userGetByAdmin[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(0);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [selectedUserID, setSelectedUserID] = useState(0);

  const openModalUpdateUser = (userId: number) => {
    setSelectedUserID(userId);
    setOpenModalUpdate(true);
  };

  const openModalDeleteUser = (userId: number) => {
    setSelectedUserID(userId);
    setOpenModalDelete(true);
  };

  const handlePageClick = async (event: { selected: number }) => {
    setCurrentPage(+event.selected + 1);
  };

  const fetchUsers = async () => {
    setIsLoadingUser(true);
    let response: any = await fetchAllUsers(currentPage, currentLimit);

    if (response) {
      setListUsers(response.objects);
      setTotalPages(response.paging.totalPages);
    }
    setIsLoadingUser(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, openModalDelete]);

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* <!-- Top Header --> */}
      <Header />
      {/* <!-- Main Content --> */}
      <main className="p-6 bg-gray-50 dark:bg-gray-900 shadow-sm border rounded border-gray-200 dark:border-gray-700 mt-2">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="-m-1.5 overflow-x-auto w-11/12">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-600 bg-white dark:bg-gray-800">
                <div className="py-3 px-4">
                  <div className="relative max-w-xs">
                    <label className="sr-only">Search</label>
                    <input
                      type="text"
                      name="hs-table-with-pagination-search"
                      id="hs-table-with-pagination-search"
                      className="py-1.5 sm:py-2 px-3 ps-9 block w-full border border-gray-200 dark:border-gray-600 rounded-lg sm:text-sm focus:z-10 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 disabled:opacity-50 disabled:pointer-events-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="Search for items"
                    />
                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                      <svg
                        className="size-4 text-gray-400 dark:text-gray-300"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-300 uppercase"
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-300 uppercase"
                        >
                          Username
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-300 uppercase"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-300 uppercase"
                        >
                          RoleID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-300 uppercase"
                        >
                          created_At
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-end text-xs font-medium text-gray-500 dark:text-gray-300 uppercase"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                      {isLoadingUser ? (
                        Array.from({ length: 5 }).map((_, index) => (
                          <tr key={index} className="animate-pulse">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="h-4 bg-gray-300 rounded w-6"></div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="h-4 bg-gray-300 rounded w-24"></div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="h-4 bg-gray-300 rounded w-32"></div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="h-4 bg-gray-300 rounded w-10"></div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="h-4 bg-gray-300 rounded w-28"></div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-end">
                              <div className="flex justify-end gap-3">
                                <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
                                <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <>
                          {listUsers && listUsers.length > 0 ? (
                            <>
                              {listUsers.map((user) => (
                                <tr
                                  key={user.id}
                                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-white">
                                    {user.id}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                    {user.username}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                    {user.email}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                    {user.roleId}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                    {user.createdAt}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                    <FontAwesomeIcon
                                      icon={faPen}
                                      className="text-yellow-500 dark:text-yellow-400 cursor-pointer mx-3"
                                      onClick={() =>
                                        openModalUpdateUser(parseInt(user.id))
                                      }
                                    />
                                    <FontAwesomeIcon
                                      icon={faTrash}
                                      className="text-red-500 dark:text-red-400 cursor-pointer"
                                      onClick={() =>
                                        openModalDeleteUser(parseInt(user.id))
                                      }
                                    />
                                  </td>
                                </tr>
                              ))}
                            </>
                          ) : (
                            <>
                              <tr>
                                <td>Not Found User</td>
                              </tr>
                            </>
                          )}
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="py-1 px-4">
                  {totalPages > 0 && (
                    <ReactPaginate
                      nextLabel=">"
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={3}
                      marginPagesDisplayed={2}
                      pageCount={totalPages}
                      previousLabel="<"
                      previousLinkClassName="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors duration-200"
                      nextLinkClassName="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors duration-200"
                      breakLabel="..."
                      breakClassName="flex items-center justify-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
                      breakLinkClassName="text-gray-700 dark:text-gray-300"
                      renderOnZeroPageCount={null}
                      containerClassName="flex items-center justify-center gap-2 my-6"
                      pageClassName="flex items-center justify-center"
                      pageLinkClassName="flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-gray-300 rounded-md hover:bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors duration-200"
                      activeClassName="bg-blue-600 text-white border-blue-600 dark:bg-blue-500 dark:border-blue-500"
                      previousClassName="flex items-center justify-center"
                      nextClassName="flex items-center justify-center"
                      disabledClassName="opacity-50 cursor-not-allowed"
                    />
                  )}
                </div>
                <ModalUpdateUser
                  idUser={selectedUserID}
                  open={openModalUpdate}
                  onClose={() => setOpenModalUpdate(false)}
                  title="Update User Form"
                />

                <ModalDelUser
                  idUser={selectedUserID}
                  open={openModalDelete}
                  onClose={() => setOpenModalDelete(false)}
                  title="Update User Form"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default UserManagement;
