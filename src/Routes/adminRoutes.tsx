import { Route } from "react-router-dom";
import Dashboard from "../Components/Admin/Dashboard/dashboard";
import Admin from "../Components/Admin/admin";
import UserManagement from "../Components/Admin/User Management/userManagement";
import RoleManagement from "../Components/Admin/Role Management/roleManagement";

const adminRoutes = (Layouts: () => React.JSX.Element) => {
  /* Admin Routes */
  return (
    <Route path="/admin" element={<Layouts />}>
      <Route index element={<Admin />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="users" element={<UserManagement />} />
      <Route path="roles" element={<RoleManagement />} />
    </Route>
  );
};

export default adminRoutes;
