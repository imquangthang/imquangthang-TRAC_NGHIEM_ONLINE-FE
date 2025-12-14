import Header from "../../Header/header";
import GroupRole from "./GroupRole/GroupRoles";
import Role from "./Role/Roles";

const RoleManagement = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* <!-- Top Header --> */}
      <Header />
      {/* <!-- Main Content --> */}
      <main className="p-6 bg-gray-50 dark:bg-gray-900 shadow-sm border rounded border-gray-200 dark:border-gray-700 mt-2">
        <div className="text-black dark:text-white">
          <h1 className="text-2xl font-bold mb-4">Roles Management</h1>
          <div className="flex flex-col gap-6">
            {/* Individual Role Management */}
            <section>
              <h2 className="text-xl font-semibold mb-2">Individual Roles</h2>
              <Role />
            </section>
            {/* Group Role Management */}
            <section>
              <h2 className="text-xl font-semibold mb-2">Group Roles</h2>
              <GroupRole />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};
export default RoleManagement;
