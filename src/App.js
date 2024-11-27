import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Use Routes instead of Switch
import Navbar from "./components/Navbar";
import UserManagement from "./components/UserManagement";
import RoleManagement from "./components/RoleManagement";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>  {/* Replace Switch with Routes */}
          <Route path="/" element={<UserManagement />} />  {/* Use element prop */}
          <Route path="/roles" element={<RoleManagement />} />  {/* Use element prop */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;


// import React from "react";
// import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
// import UserManagement from "./components/UserManagement";
// import RoleManagement from "./components/RoleManagement";
// import "./styles/Global.css";

// const roles = [
//   { id: 1, name: "Admin", permissions: ["read", "write", "delete"] },
//   { id: 2, name: "Editor", permissions: ["read", "write"] },
//   { id: 3, name: "Viewer", permissions: ["read"] },
// ];

// const App = () => {
//   return (
//     <Router>
//       <nav className="navbar">
//         <NavLink to="/users" className="nav-link">
//           Users
//         </NavLink>
//         <NavLink to="/roles" className="nav-link">
//           Roles
//         </NavLink>
//       </nav>
//       <Routes>
//         <Route path="/users" element={<UserManagement roles={roles} />} />
//         <Route path="/roles" element={<RoleManagement />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


