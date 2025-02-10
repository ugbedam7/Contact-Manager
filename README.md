# Contact Manager App Backend

## 1. Endpoint Descriptions

The backend provides RESTful APIs for user authentication, contact management, and admin controls. Below are the key endpoints:

### **Auth Endpoints**

```http
POST /api/auth/register – Register a new user.
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
