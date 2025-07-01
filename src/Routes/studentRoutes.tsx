import { Route } from "react-router-dom";
import type { userState } from "../Redux/Types/user.type";

const studentRoutes = (Layouts: () => React.JSX.Element, user: userState) => {
  /* User Routes */
  return (
    <Route path="/" element={<Layouts />}>
      <Route index element={<></>} />
      <Route path="guide" element={<></>} />
      <Route
        path="appointment"
        element={<></>}
      />
      <Route path="look-up" element={<></>} />
      <Route path="history" element={<></>} />
      <Route path="ecg-history" element={<></>} />
      <Route path="account/*" element={<></>} />
      <Route path="measure-prepare" element={<></>} />
      <Route path="chat" element={<></>} />
    </Route>
  );
};

export default studentRoutes;
