import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminHeader from "../adminHeader";

const UserManagement = () => {
  const listUsers = [
    {
      name: "John Brown",
      username: "John",
      email: "John@gmail.com",
      birthday: "24/11/2004",
      gender: "Male",
    },
    {
      name: "John Brown",
      username: "John",
      email: "John@gmail.com",
      birthday: "24/11/2004",
      gender: "Male",
    },
    {
      name: "John Brown",
      username: "John",
      email: "John@gmail.com",
      birthday: "24/11/2004",
      gender: "Male",
    },
    {
      name: "John Brown",
      username: "John",
      email: "John@gmail.com",
      birthday: "24/11/2004",
      gender: "Male",
    },
    {
      name: "John Brown",
      username: "John",
      email: "John@gmail.com",
      birthday: "24/11/2004",
      gender: "Male",
    },
    {
      name: "John Brown",
      username: "John",
      email: "John@gmail.com",
      birthday: "24/11/2004",
      gender: "Male",
    },
    {
      name: "John Brown",
      username: "John",
      email: "John@gmail.com",
      birthday: "24/11/2004",
      gender: "Male",
    },
    {
      name: "John Brown",
      username: "John",
      email: "John@gmail.com",
      birthday: "24/11/2004",
      gender: "Male",
    },
    {
      name: "John Brown",
      username: "John",
      email: "John@gmail.com",
      birthday: "24/11/2004",
      gender: "Male",
    },
    {
      name: "John Brown",
      username: "John",
      email: "John@gmail.com",
      birthday: "24/11/2004",
      gender: "Male",
    },
  ];
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* <!-- Top Header --> */}
      <AdminHeader />
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
                          Name
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
                          Birthday
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-300 uppercase"
                        >
                          Gender
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
                      {listUsers && listUsers.length > 0 ? (
                        <>
                          {listUsers.map((user) => (
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-white">
                                {user.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                {user.username}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                {user.email}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                {user.birthday}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                {user.gender}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                <FontAwesomeIcon
                                  icon={faPen}
                                  className="text-yellow-500 dark:text-yellow-400 cursor-pointer mx-3"
                                />
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className="text-red-500 dark:text-red-400 cursor-pointer"
                                />
                              </td>
                            </tr>
                          ))}
                        </>
                      ) : (
                        <></>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="py-1 px-4">
                  <nav
                    className="flex items-center space-x-1"
                    aria-label="Pagination"
                  >
                    <button
                      type="button"
                      className="p-2.5 min-w-10 inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-hidden focus:bg-gray-100 dark:focus:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none"
                      aria-label="Previous"
                    >
                      <span aria-hidden="true">«</span>
                      <span className="sr-only">Previous</span>
                    </button>
                    <button
                      type="button"
                      className="min-w-10 flex justify-center items-center text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-hidden focus:bg-gray-100 dark:focus:bg-gray-700 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none"
                      aria-current="page"
                    >
                      1
                    </button>
                    <button
                      type="button"
                      className="min-w-10 flex justify-center items-center text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-hidden focus:bg-gray-100 dark:focus:bg-gray-700 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none"
                    >
                      2
                    </button>
                    <button
                      type="button"
                      className="min-w-10 flex justify-center items-center text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-hidden focus:bg-gray-100 dark:focus:bg-gray-700 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none"
                    >
                      3
                    </button>
                    <button
                      type="button"
                      className="p-2.5 min-w-10 inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-hidden focus:bg-gray-100 dark:focus:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none"
                      aria-label="Next"
                    >
                      <span className="sr-only">Next</span>
                      <span aria-hidden="true">»</span>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default UserManagement;
