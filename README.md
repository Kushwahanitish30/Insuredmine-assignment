# Policy MVC API

A Node.js MVC project for managing insurance policies, agents, users, accounts, carriers, and categories (LOB), with MongoDB, worker threads for CSV import, validation, CPU monitoring, and RESTful APIs.

## Features
- Upload CSV data to MongoDB using worker threads
- Search policy info by username
- Aggregate policies by user
- Real-time CPU monitoring (auto-restart on >70% usage)
- Schedule messages for future insertion
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
MONGO_URI=mongodb://localhost:27017/policyDB
```

### 3. Run Server
```bash
npm run dev   # uses nodemon for auto-reload
npm start     # runs with node
```

### 4. API Endpoints

#### Upload CSV
`POST /api/policies/upload`
Body:
```json
{
  "filePath": "d:/Testing/policyDB/yourfile.csv"
}
```

#### Search Policy by Username
`GET /api/policies/search?username=John`

#### Aggregate Policies by User
`GET /api/policies/aggregate`

#### Schedule Message
`POST /api/system/schedule-message`
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

## License
ISC
