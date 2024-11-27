User Management System
A simple and customizable user management system built with React. It allows users to create, edit, delete, and assign roles to other users, as well as filter, search, and sort the list of users. It uses localStorage to persist data between sessions and Material-UI for UI components.

Features
User Management: Add, edit, delete, and manage users.
Role Management: Create and assign roles with specific permissions.
Search Functionality: Search users by name or role.
Filter by Status: Filter users based on their active or inactive status.
Sorting: Sort users by name, role, or status.
Analytics: View the total number of users and the number of active users.
Permissions: Permissions for actions like edit, delete, and view are based on roles.

/src
  /components
    Navbar.jsx
    Navbar.css
    UserManagement.js
    RoleManagement.js
 /services
    api.js
 App.js               
index.js
db.json
UserManagement.js: This is the main component that contains all the logic for user and role management. It also handles the sorting, searching, and filtering functionality.
App.js: Entry point of the React application where the UserManagement component is rendered.  


Dependencies
React: Frontend library used for building the user interface.
Material-UI: UI component library for better design and usability.
localStorage: Used for persistent storage of user data and roles.
Usage
Adding a User:
Enter the name of the user in the "Name" field.
Select a role from the dropdown (Admin, User, etc.).
Set the status as "Active" or "Inactive".
Click "Save" to add the user.
Editing a User:
Click the "Edit" button on any user card to modify their details.
Save the changes to update the user.
Deleting a User:
Click the "Delete" button on any user card to remove them from the list.
Managing Roles:
To create a new role, enter the role name in the "New Role" field and click "Add Role".
Roles can be assigned to users while adding or editing them.
Searching and Filtering:
Use the search bar to search users by name or role.
Use the status dropdown to filter users by their current status (Active/Inactive).
Sort users by name, role, or status using the sorting dropdown.
Analytics:
The total number of users and the number of active users will be displayed at the top of the page.
Built With
React: JavaScript library for building user interfaces.
Material-UI: A React UI framework for creating beautiful user interfaces.
localStorage: For saving data in the browser's local storage.
