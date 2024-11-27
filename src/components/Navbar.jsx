import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/" className="nav-link">User Management</Link>
        </li>
        <li>
          <Link to="/roles" className="nav-link">Role Management</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;



// import React from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css";

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <h1>RBAC Admin Dashboard</h1>
//       <ul>
//         <li><Link to="/">Users</Link></li>
//         <li><Link to="/roles">Roles</Link></li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;

