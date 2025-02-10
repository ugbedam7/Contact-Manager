# Contact Manager App Backend Documentation

## 1. Endpoint Descriptions

The backend provides RESTful APIs for user authentication, contact management, and admin controls. Below are the key endpoints:

### **Auth Endpoints**

```http
POST /api/auth/signup – Register a new user.
POST /api/auth/login – Authenticate and retrieve a token.
```

### **User Endpoints**

```http
GET /api/users/{id} – Fetch user details.
PUT /api/users/{id} – Update user details (Admin only).
DELETE /api/users/{id} – Delete user account (Admin only).
```

### **Contact Endpoints**

```http
POST /api/contacts – Create a new contact (User only).
GET /api/contacts – Retrieve all contacts.
GET /api/contacts/{id} – Get details of a specific contact.
PUT /api/contacts/{id} – Update a contact (Only owner or Admin).
DELETE /api/contacts/{id} – Delete a contact (Only owner or Admin).
```

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

```

```
