import React, { useState, useEffect } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
} from "@mui/material";
import { Edit, Delete, Visibility, Close } from "@mui/icons-material";

const UserManagement = () => {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const [roles, setRoles] = useState(() => {
    const savedRoles = localStorage.getItem("roles");
    return savedRoles
      ? JSON.parse(savedRoles)
      : [{ id: 1, name: "Admin", permissions: ["read", "write", "delete"] }];
  });

  const [form, setForm] = useState({ id: null, name: "", role: "", status: "Active" });
  const [currentUserRole, setCurrentUserRole] = useState(null);
  const [newRole, setNewRole] = useState("");

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortField, setSortField] = useState("");

  // Modal states
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("roles", JSON.stringify(roles));
  }, [roles]);

  // Handle User Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.role) {
      setSnackbar({ open: true, message: "Name and Role are required!", severity: "error" });
      return;
    }
    if (users.some((user) => user.name === form.name && user.id !== form.id)) {
      setSnackbar({ open: true, message: "User with this name already exists!", severity: "warning" });
      return;
    }
    if (form.id) {
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === form.id ? form : user))
      );
      setSnackbar({ open: true, message: "User updated successfully!", severity: "success" });
    } else {
      setUsers((prevUsers) => [...prevUsers, { ...form, id: Date.now() }]);
      setSnackbar({ open: true, message: "User added successfully!", severity: "success" });
    }
    setForm({ id: null, name: "", role: "", status: "Active" });
  };

  const handleAddRole = () => {
    if (newRole && !roles.some((role) => role.name === newRole)) {
      setRoles([...roles, { id: Date.now(), name: newRole, permissions: ["read", "write"] }]);
      setSnackbar({ open: true, message: "Role added successfully!", severity: "success" });
      setNewRole("");
    } else {
      setSnackbar({ open: true, message: "Role already exists or is empty!", severity: "error" });
    }
  };

  const handleDelete = (id) => {
    setUserToDelete(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userToDelete));
    setSnackbar({ open: true, message: "User deleted successfully!", severity: "success" });
    setOpenDeleteDialog(false);
  };

  const cancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  const handleEdit = (user) => {
    if (currentUserRole && currentUserRole.permissions.includes("write")) {
      setForm(user);
    } else {
      setSnackbar({ open: true, message: "You do not have permission to edit.", severity: "error" });
    }
  };

  const handleAssignRole = (user, role) => {
    setCurrentUserRole(roles.find((r) => r.name === role));
    setForm({ ...form, role });
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setOpenViewDialog(true);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusFilteredUsers = filteredUsers.filter(
    (user) => (filterStatus ? user.status === filterStatus : true)
  );

  const sortedUsers = [...statusFilteredUsers].sort((a, b) => {
    if (!sortField) return 0;
    if (a[sortField] < b[sortField]) return -1;
    if (a[sortField] > b[sortField]) return 1;
    return 0;
  });

  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.status === "Active").length;

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>

      <div style={{ marginBottom: "20px" }}>
        <Typography variant="subtitle1">Total Users: {totalUsers}</Typography>
        <Typography variant="subtitle1">Active Users: {activeUsers}</Typography>
      </div>

      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <TextField
          label="New Role"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddRole}>
          Add Role
        </Button>
      </div>

      <div style={{ marginBottom: "20px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
        <TextField
          label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: "1" }}
        />
        <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <MenuItem value="">Filter by Status</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </Select>
        <Select value={sortField} onChange={(e) => setSortField(e.target.value)}>
          <MenuItem value="">Sort By</MenuItem>
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="role">Role</MenuItem>
          <MenuItem value="status">Status</MenuItem>
        </Select>
      </div>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <TextField
          label="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <Select value={form.role} onChange={(e) => handleAssignRole(form, e.target.value)}>
          <MenuItem value="">Select Role</MenuItem>
          {roles.map((role) => (
            <MenuItem key={role.id} value={role.name}>
              {role.name}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </Select>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </form>

      <Grid container spacing={3}>
        {sortedUsers.map((user) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
            <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Role: {user.role}
                </Typography>
                <Typography variant="body2" color={user.status === "Active" ? "green" : "red"}>
                  Status: {user.status}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  startIcon={<Visibility />}
                  onClick={() => handleViewUser(user)}
                >
                  View
                </Button>
                {currentUserRole?.permissions.includes("write") && (
                  <Button
                    size="small"
                    startIcon={<Edit />}
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </Button>
                )}
                {currentUserRole?.permissions.includes("delete") && (
                  <Button
                    size="small"
                    startIcon={<Delete />}
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* View User Dialog */}
      <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)}>
        <DialogTitle>View User</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Username: {selectedUser?.name}</Typography>
          <Typography variant="body1">Role: {selectedUser?.role}</Typography>
          <Typography variant="body1" style={{ color: selectedUser?.status === "Active" ? "green" : "red" }}>
            Status: {selectedUser?.status}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenViewDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={cancelDelete}>
        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body1" align="center" color="error">
            Are you sure you want to delete this user? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

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

export default UserManagement;
