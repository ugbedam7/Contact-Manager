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

### 1. User Authentication

#### Login Request:

```
POST /api/auth/login
Content-Type: application/json
```

```
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

#### Login Response (200 OK):

```
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1..."
}
```

#### Unauthorized Response (401 Unauthorized):

```
{
  "error": "Invalid credentials"
}
```

### 2. Creating a New Contact

#### Request:

```
POST /api/contacts
Authorization: Bearer <token>
Content-Type: application/json
```

```
{
  "name": "John Doe",
  "phone": "+1234567890",
  "email": "johndoe@example.com"
}
```

#### Response (201 Created):

```
{
  "id": 25,
  "name": "John Doe",
  "phone": "+1234567890",
  "email": "johndoe@example.com",
  "owner": "user123"
}
```

#### Error (400 Bad Request - Missing Fields):

```
{
  "error": "Phone number is required"
}
```

### 3. Fetching All Contacts

#### Request:

```
GET /api/contacts
Authorization: Bearer <token>
```

#### Response (200 OK):

```
[
  {
    "id": 25,
    "name": "John Doe",
    "phone": "+1234567890",
    "email": "johndoe@example.com",
    "owner": "user123"
  },
  {
    "id": 26,
    "name": "Jane Smith",
    "phone": "+1987654321",
    "email": "janesmith@example.com",
    "owner": "user456"
  }
]
```

### 4. Updating a Contact (Owner Only)

#### Request:

```
PUT /api/contacts/25
Authorization: Bearer <token>
Content-Type: application/json
```

```
{
  "phone": "+1112223333"
}
```

#### Response (200 OK):

```
{
  "message": "Contact updated successfully",
  "updatedContact": {
    "id": 25,
    "name": "John Doe",
    "phone": "+1112223333",
    "email": "johndoe@example.com",
    "owner": "user123"
  }
}
```

#### Error (403 Forbidden - Unauthorized Update):

```
{
  "error": "You can only update your own contacts"
}
```

### 5. Deleting a Contact (Owner or Admin Only)

#### Request:

```
DELETE /api/contacts/25
Authorization: Bearer <token>
```

#### Response (200 OK):

```
{
  "message": "Contact deleted successfully"
}
```

#### Error (403 Forbidden - Not Owner/Admin):

```
{
  "error": "You do not have permission to delete this contact"
}
```

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
- **Framework: Express JS** - A minimal and flexible Node.js framework for  
   building high-performance APIs
- **Authentication**: JWT (JSON Web Token) for user authentication
- **Database: Mongo DB** - No SQL database for storing application data
- **ORM: Mongoose** - For database interactions
- **API Documentation**: Postman - Auto-generated API documentation

## Other Tools & Utilities

- **Version Control: Git & GitHub** - For managing source code
- **Linting & Formatting**: ESLint, Prettier (Frontend) & (Backend) Ensures
  code quality
- **Package Management**: npm (Frontend) & (Backend) - For dependency
  management
