import {
  faArrowUp,
  faBox,
  faChartLine,
  faDownload,
  faEdit,
  faEye,
  faPlus,
  faReceipt,
  faTrash,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminHeader from "../adminHeader";

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="min-h-screen w-full">
        <div className="w-full">
          {/* <!-- Top Header --> */}
          <AdminHeader />

          {/* <!-- Main Dashboard Content --> */}
          <main className="p-6 bg-gray-50 dark:bg-gray-900 shadow-sm border rounded border-gray-200 dark:border-gray-700 mt-2">
            {/* <!-- Stats Cards --> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* <!-- Revenue Card --> */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Total Revenue
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                      $48,291
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-green-600 dark:text-green-400 text-sm font-medium flex items-center">
                        <FontAwesomeIcon
                          icon={faArrowUp}
                          className="text-cordes-blue dark:text-blue-400 text-xl mr-1"
                        />
                        12%
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
                        vs last month
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-sky-100 dark:bg-sky-900 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faChartLine}
                      className="text-cordes-blue dark:text-blue-400 text-xl"
                    />
                  </div>
                </div>
              </div>

              {/* <!-- Users Card --> */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Total Users
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                      15,847
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-green-600 dark:text-green-400 text-sm font-medium flex items-center">
                        <FontAwesomeIcon
                          icon={faArrowUp}
                          className="text-cordes-blue dark:text-blue-400 text-xl mr-1"
                        />
                        8%
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
                        vs last month
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faUsers}
                      className="text-cordes-blue dark:text-blue-400 text-xl"
                    />
                  </div>
                </div>
              </div>

              {/* <!-- Orders Card --> */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Total Orders
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                      2,847
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-green-600 dark:text-green-400 text-sm font-medium flex items-center">
                        <FontAwesomeIcon
                          icon={faArrowUp}
                          className="text-cordes-blue dark:text-blue-400 text-xl mr-1"
                        />
                        15%
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
                        vs last month
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faReceipt}
                      className="text-cordes-blue dark:text-blue-400 text-xl"
                    />
                  </div>
                </div>
              </div>

              {/* <!-- Products Card --> */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Products
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                      1,247
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-green-600 dark:text-green-400 text-sm font-medium flex items-center">
                        <FontAwesomeIcon
                          icon={faArrowUp}
                          className="text-cordes-blue dark:text-blue-400 text-xl mr-1"
                        />
                        5%
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
                        vs last month
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faBox}
                      className="text-cordes-blue dark:text-blue-400 text-xl"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Charts Row --> */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* <!-- Revenue Chart --> */}
              <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Revenue Analytics
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Monthly revenue overview
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 text-sm bg-cordes-blue text-white rounded-md dark:bg-blue-600 dark:hover:bg-blue-700">
                      6M
                    </button>
                    <button className="px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                      1Y
                    </button>
                  </div>
                </div>
                <div className="h-80">
                  <canvas id="revenueChart"></canvas>
                </div>
              </div>

              {/* <!-- Top Products --> */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Top Products
                  </h3>
                  <button className="text-cordes-blue dark:text-blue-400 hover:text-cordes-dark dark:hover:text-blue-300 text-sm font-medium">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src="https://i.ytimg.com/vi/08JoSCHV9VY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAC7M1K4hMJbmFQQFppnSNzsZAcRA"
                      alt="Product"
                      className="w-12 h-12 rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        iPhone 15 Pro
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Electronics
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        $1,299
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        +12%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <img
                      src="https://i.ytimg.com/vi/08JoSCHV9VY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAC7M1K4hMJbmFQQFppnSNzsZAcRA"
                      alt="Product"
                      className="w-12 h-12 rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        MacBook Pro
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Computers
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        $2,499
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        +8%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <img
                      src="https://i.ytimg.com/vi/08JoSCHV9VY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAC7M1K4hMJbmFQQFppnSNzsZAcRA"
                      alt="Product"
                      className="w-12 h-12 rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        AirPods Pro
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Audio
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        $249
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        +15%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <img
                      src="https://i.ytimg.com/vi/08JoSCHV9VY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAC7M1K4hMJbmFQQFppnSNzsZAcRA"
                      alt="Product"
                      className="w-12 h-12 rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        Apple Watch
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Wearables
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        $399
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        +6%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Recent Orders Table --> */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Recent Orders
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Latest customer orders and transactions
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <FontAwesomeIcon
                        icon={faDownload}
                        className="text-cordes-blue dark:text-blue-400 text-xl mr-2"
                      />
                      Export
                    </button>
                    <button className="px-4 py-2 bg-sky-500 dark:bg-blue-600 text-white rounded-lg hover:bg-cordes-dark dark:hover:bg-blue-700 transition-colors">
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="text-cordes-blue dark:text-blue-400 text-xl mr-2"
                      />
                      Add Order
                    </button>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          #15847
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src="https://www.investopedia.com/thmb/NSwuyMYGVWCHVIi1AEoaPkdmMD0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Brand-loyalty_final-8ad57b86183e42348e18bc306c87778e.png"
                            alt="Customer"
                            className="w-8 h-8 rounded-full mr-3"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              John Doe
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              john@example.com
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        iPhone 15 Pro
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                        $1,299.00
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-400">
                          Completed
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        May 22, 2025
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-cordes-blue dark:text-blue-400 hover:text-cordes-dark dark:hover:text-blue-300">
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                          <button className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          #15846
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src="https://www.investopedia.com/thmb/NSwuyMYGVWCHVIi1AEoaPkdmMD0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Brand-loyalty_final-8ad57b86183e42348e18bc306c87778e.png"
                            alt="Customer"
                            className="w-8 h-8 rounded-full mr-3"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              Sarah Wilson
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              sar blog@example.com
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        MacBook Pro
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                        $2,499.00
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-400">
                          Pending
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        May 21, 2025
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-cordes-blue dark:text-blue-400 hover:text-cordes-dark dark:hover:text-blue-300">
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                          <button className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          #15845
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src="https://www.investopedia.com/thmb/NSwuyMYGVWCHVIi1AEoaPkdmMD0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Brand-loyalty_final-8ad57b86183e42348e18bc306c87778e.png"
                            alt="Customer"
                            className="w-8 h-8 rounded-full mr-3"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              Mike Johnson
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              mike@example.com
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        AirPods Pro
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                        $249.00
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-400">
                          Cancelled
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        May 20, 2025
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-cordes-blue dark:text-blue-400 hover:text-cordes-dark dark:hover:text-blue-300">
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                          <button className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* <!-- Bottom Row --> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* <!-- Recent Activity --> */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">
                        New user registered
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        sarah.johnson@email.com • 2 minutes ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">
                        Order completed
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Order #15847 - $299.99 • 5 minutes ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">
                        Product updated
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        iPhone 15 Pro - Stock: 25 • 8 minutes ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 dark:bg-orange-400 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">
                        Payment received
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        $1,245.00 from client • 12 minutes ago
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- System Status --> */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  System Status
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 dark:bg-green-400 rounded-full"></div>
                      <span className="text-sm text-gray-900 dark:text-white">
                        Server Status
                      </span>
                    </div>
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                      Online
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 dark:bg-green-400 rounded-full"></div>
                      <span className="text-sm text-gray-900 dark:text-white">
                        Database
                      </span>
                    </div>
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-yellow-500 dark:bg-yellow-400 rounded-full"></div>
                      <span className="text-sm text-gray-900 dark:text-white">
                        API Status
                      </span>
                    </div>
                    <span className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
                      Warning
                    </span>
                  </div>
                  <div className="mt-6">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                      <span>Server Load</span>
                      <span>68%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-cordes-blue dark:bg-blue-600 h-2 rounded-full"
                        style={{ width: "68%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
