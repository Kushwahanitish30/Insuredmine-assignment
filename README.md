# Policy MVC API

A Node.js MVC REST API for managing insurance policies, agents, users, accounts, carriers, and categories (LOB) using MongoDB. Features include worker threads for CSV import, validation, CPU monitoring, pagination, and CRUD endpoints for all resources.

## Features
- Upload CSV data to MongoDB using worker threads
- Full CRUD for Agents, Users, Accounts, LOBs, Carriers, Policies
- Search policy info by username
- Aggregate policies by user
- Real-time CPU monitoring (auto-exit on >70% usage)
- Schedule messages for future insertion
- Pagination for list endpoints
- MVC architecture
- Request validation with Joi
- Logging with Morgan
- Ready-to-use Postman collection

## Getting Started

### 1. Clone & Install
```bash
npm install
```

### 2. Environment Setup
Edit `.env` for MongoDB connection:
```
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/policyDB
```

### 3. Run Server
```bash
npm run dev   # uses nodemon for auto-reload
npm start     # runs with node
```

### 4. API Endpoints

#### Agents
- `GET /api/agents?offset=0&limit=10` — List agents (paginated)
- `GET /api/agents/:id` — Get agent by ID
- `POST /api/agents` — Create agent
- `PUT /api/agents/:id` — Update agent
- `DELETE /api/agents/:id` — Delete agent

#### Users
- `GET /api/users?offset=0&limit=10` — List users (paginated)
- `GET /api/users/:id` — Get user by ID
- `POST /api/users` — Create user
- `PUT /api/users/:id` — Update user
- `DELETE /api/users/:id` — Delete user

#### Accounts
- `GET /api/accounts?offset=0&limit=10` — List accounts (paginated)
- `GET /api/accounts/:id` — Get account by ID
- `POST /api/accounts` — Create account
- `PUT /api/accounts/:id` — Update account
- `DELETE /api/accounts/:id` — Delete account

#### LOBs (Categories)
- `GET /api/lobs?offset=0&limit=10` — List LOBs (paginated)
- `GET /api/lobs/:id` — Get LOB by ID
- `POST /api/lobs` — Create LOB
- `PUT /api/lobs/:id` — Update LOB
- `DELETE /api/lobs/:id` — Delete LOB

#### Carriers
- `GET /api/carriers?offset=0&limit=10` — List carriers (paginated)
- `GET /api/carriers/:id` — Get carrier by ID
- `POST /api/carriers` — Create carrier
- `PUT /api/carriers/:id` — Update carrier
- `DELETE /api/carriers/:id` — Delete carrier

#### Policies
- `GET /api/policies?offset=0&limit=10` — List policies (paginated)
- `GET /api/policies/:id` — Get policy by ID
- `POST /api/policies` — Create policy
- `PUT /api/policies/:id` — Update policy
- `DELETE /api/policies/:id` — Delete policy
- `POST /api/policies/upload` — Upload CSV file (form-data, key: `file`)
- `GET /api/policies/search?username=John` — Search policies by username
- `GET /api/policies/aggregate` — Aggregate policies by user

#### System
- `POST /api/system/schedule-message` — Schedule a message for future insertion
  Body:
  ```json
  {
    "message": "Hello!",
    "day": "2025-10-03",
    "time": "10:00:00"
  }
  ```

### 5. Postman Collection
Import `PolicyMVC.postman_collection.json` into Postman for ready-to-use requests.

### 6. CSV Format
Your CSV should have columns:
```
agent,userType,policy_mode,producer,policy_number,premium_amount_written,premium_amount,policy_type,company_name,category_name,policy_start_date,policy_end_date,csr,account_name,email,gender,firstname,city,account_type,phone,address,state,zip,dob,primary,Applicant ID,agency_id,hasActive ClientPolicy
```

### 7. Validation
- Request bodies are validated using Joi middleware.
- Invalid requests return 400 errors with details.

### 8. CPU Monitoring
- The server monitors CPU usage and exits if usage >70%. Use PM2 or similar to auto-restart.

### 9. Logging
- All requests are logged using Morgan.

### 10. Project Structure
```
controllers/   # Business logic
models/        # Mongoose schemas
routes/        # API endpoints
middlewares/   # Validation, CPU monitor
workers/       # Worker thread for CSV import
utils/         # CSV parser
app.js         # Main app
.env           # Environment config
package.json   # Dependencies
```


