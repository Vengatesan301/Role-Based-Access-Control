// import React, { useState, useEffect } from "react";

// const RoleManagement = () => {
//   const [roles, setRoles] = useState(() => {
//     const savedRoles = localStorage.getItem("roles");
//     return savedRoles ? JSON.parse(savedRoles) : [];
//   });

//   const [form, setForm] = useState({ id: null, name: "", permissions: "" });

//   useEffect(() => {
//     localStorage.setItem("roles", JSON.stringify(roles));
//   }, [roles]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Convert permissions to an array
//     const newPermissions = form.permissions
//       ? form.permissions.split(",").map((p) => p.trim())
//       : [];
//     if (form.id) {
//       // Update existing role
//       setRoles((prevRoles) =>
//         prevRoles.map((role) =>
//           role.id === form.id
//             ? { ...form, permissions: newPermissions }
//             : role
//         )
//       );
//     } else {
//       // Add new role
//       setRoles((prevRoles) => [
//         ...prevRoles,
//         { ...form, id: Date.now(), permissions: newPermissions },
//       ]);
//     }
//     setForm({ id: null, name: "", permissions: "" });
//   };

//   const handleDelete = (id) => {
//     setRoles((prevRoles) => prevRoles.filter((role) => role.id !== id));
//   };

//   const handleEdit = (role) => {
//     // Convert permissions array to a comma-separated string for editing
//     const permissionsAsString = Array.isArray(role.permissions)
//       ? role.permissions.join(", ")
//       : "";
//     setForm({ ...role, permissions: permissionsAsString });
//   };

//   return (
//     <div className="role-management">
//       <h2>Role Management</h2>
//       <form onSubmit={handleSubmit} className="form">
//         <input
//           type="text"
//           placeholder="Role Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Permissions (comma-separated)"
//           value={form.permissions}
//           onChange={(e) => setForm({ ...form, permissions: e.target.value })}
//         />
//         <button type="submit">Save</button>
//       </form>

//       <div className="role-cards">
//         {roles.map((role) => (
//           <div key={role.id} className="role-card">
//             <h4>{role.name}</h4>
//             <p>
//               Permissions:{" "}
//               {Array.isArray(role.permissions)
//                 ? role.permissions.join(", ")
//                 : ""}
//             </p>
//             <div className="actions">
//               <button onClick={() => handleEdit(role)}>Edit</button>
//               <button onClick={() => handleDelete(role.id)}>Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RoleManagement;



import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Card, CardContent, CardActions, Typography, Snackbar, Alert } from "@mui/material";

const RoleManagement = () => {
  const [roles, setRoles] = useState(() => {
    const savedRoles = localStorage.getItem("roles");
    return savedRoles ? JSON.parse(savedRoles) : [];
  });

  const [form, setForm] = useState({ id: null, name: "", permissions: "" });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });

  useEffect(() => {
    localStorage.setItem("roles", JSON.stringify(roles));
  }, [roles]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPermissions = form.permissions
      ? form.permissions.split(",").map((p) => p.trim())
      : [];

    if (!form.name || !newPermissions.length) {
      setSnackbar({ open: true, message: "Role name and permissions are required!", severity: "error" });
      return;
    }

    if (form.id) {
      setRoles((prevRoles) =>
        prevRoles.map((role) =>
          role.id === form.id ? { ...form, permissions: newPermissions } : role
        )
      );
      setSnackbar({ open: true, message: "Role updated successfully!", severity: "success" });
    } else {
      setRoles((prevRoles) => [
        ...prevRoles,
        { ...form, id: Date.now(), permissions: newPermissions },
      ]);
      setSnackbar({ open: true, message: "New role added successfully!", severity: "success" });
    }

    setForm({ id: null, name: "", permissions: "" });
  };

  const handleDelete = (id) => {
    setRoles((prevRoles) => prevRoles.filter((role) => role.id !== id));
    setSnackbar({ open: true, message: "Role deleted successfully!", severity: "success" });
  };

  const handleEdit = (role) => {
    const permissionsAsString = Array.isArray(role.permissions)
      ? role.permissions.join(", ")
      : "";
    setForm({ ...role, permissions: permissionsAsString });
  };

  return (
    <div className="role-management" style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Role Management
      </Typography>
      
      {/* Role Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <TextField
          label="Role Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          fullWidth
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Permissions (comma-separated)"
          value={form.permissions}
          onChange={(e) => setForm({ ...form, permissions: e.target.value })}
          fullWidth
          style={{ marginBottom: "10px" }}
        />
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </form>

      {/* Role List */}
      <Grid container spacing={2}>
        {roles.map((role) => (
          <Grid item xs={12} sm={6} md={4} key={role.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{role.name}</Typography>
                <Typography variant="body2">Permissions: {role.permissions.join(", ")}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => handleEdit(role)}>
                  Edit
                </Button>
                <Button size="small" color="secondary" onClick={() => handleDelete(role.id)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </div>
  );
};

export default RoleManagement;

