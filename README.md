# Contact-Manager Backend:

## Endpoint descriptions,

## API documentation, and instructions for consuming the endpoints.

- Here’s an industry-standard Node.js + Express + MongoDB contact app with - - authentication (JWT),
- role-based access control (RBAC), and email notifications (using Nodemailer).
  Features:

✅ User authentication with JWT
✅ Role-based access (Users can edit/delete only their contacts; Admins can manage all)
✅ Email notification when a new contact is added
✅ MongoDB for storing users & contacts

- How It Works:

  User Authentication
  Users sign up and log in to get a JWT token.
  JWT is required for managing contacts.

  Role-Based Access Control (RBAC)
  Users can add, edit, or delete their own contacts.
  Admins can edit or delete any contact.

  Email Notifications (Nodemailer)
  When a user adds a new contact, they receive an email notification.
