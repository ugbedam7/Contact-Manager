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
PATCH /api/contacts/{id} – Update a contact image (Only owner or Admin).
DELETE /api/contacts/{id} – Delete a contact (Only owner or Admin).
```

## 2. API Documentation

- **Authentication**: Uses JWT for secure user sessions.
- **Authorization**: Users can only modify their own contacts. Admins have full
  access.
- **Responses**:
  - 200 OK – Successful operation.
  - 201 Created – New resource successfully created.
  - 400 Bad Request – Invalid input data.
  - 401 Unauthorized – Authentication required.
  - 403 Forbidden – Action not allowed.
  - 404 Not Found – Resource does not exist.

## 3. Instructions for Consuming the Endpoints

- **Authentication**: User obtains a JWT token via `/api/auth/login`, then
  include it in requests as Authorization: Bearer `<token>`.

- **Creating a Contact**: Send a POST request to `/api/contacts` with a JSON or formData body

```
  {
      "fullname": "John Doe",
      "phone": "1234567890",
      "email": "john@example.com" ,
      "xhandle": "@johndoe",
      "address": "#45 Park Avenue, New Yok USA"
   }
```

- **Fetching Contact(s)**: Send a GET request to `/api/contacts` to get all
  contacts or a GET request to `/api/contacts/{id}` for a specific one.

- **Modifying Contacts**:

  - Send a PUT request `/api/contacts/{id}` to update a contact data.
  - Send a PATCH request `/api/contacts/{id}` to update contact image.
  - Only the owner or an admin can edit/delete contact details.

- **Admin Privileges**: Use admin credentials to delete or modify any user or contact.

# Technologies Used

## Backend

- **Proramming Language**: JavaScript
- **Framework: Express JS** - For building high-performance APIs
- **Authentication**: JWT (JSON Web Token) for user authentication
- **Database: Mongo DB** - No SQL database for storing application data
- **ORM: Mongoose** - For database interactions
- **API Documentation**: POSTMAN - Auto-generated API documentation
