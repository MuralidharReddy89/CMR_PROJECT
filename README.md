# CRM Frontend

React frontend for the CRM MVP.

## Setup

1. Copy files into a folder (crm-frontend).
2. Run `npm install` (ensure you have react-scripts via Create React App or adjust for Vite if needed).
3. Create a `.env` with `REACT_APP_API_BASE` if your API is not at `http://localhost:5000/api`.
4. Run `npm start`.

## Notes
- The frontend expects the backend routes:
  - POST `/api/auth/login` → returns `{ token, user }`
  - POST `/api/auth/signup` optional
  - GET/POST/PUT/DELETE `/api/leads`
  - POST `/api/leads/:id/convert`
  - GET/PUT `/api/opportunities`

- Sample users seeded on backend should match your backend seed script (e.g., `u001/u002/u003` and passwords).


# CRM Backend

Node.js + Express backend for the CRM MVP, using JWT authentication and SQLite database.

## Setup

1. Copy files into a folder (crm-backend).
2. Run `npm install`.
3. Create a `.env` file with:


4. Run `npm start` to start the server on `http://localhost:5000`.

## Routes

### Auth
- POST `/api/auth/login` → `{ email, password }` → returns `{ token, user }`
- POST `/api/auth/signup` (optional)

### Leads
- GET `/api/leads` → returns all leads
- POST `/api/leads` → create lead
- PUT `/api/leads/:id` → update lead
- DELETE `/api/leads/:id` → delete lead
- POST `/api/leads/:id/convert` → convert lead to opportunity

### Opportunities
- GET `/api/opportunities` → returns all opportunities
- PUT `/api/opportunities/:id` → update opportunity (stage/value)

