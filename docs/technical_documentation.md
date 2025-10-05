### Product Inventory API 

- API Name: Product Inventory API
- Version: 1.0
- Base URL (example): https://product-inventory-three.vercel.app/
- Auth model: JWT (Bearer token) — issued at signup/login, expires after 24 hours.


## Overview
This API provides authenticated CRUD operations for managing product inventory. Each product is owned by a user (ownership is enforced on every operation). All endpoints that operate on products require authentication. The API is stateless and uses JSON for requests and responses.

# Primary resources:
- User — register and authenticate users.
- Product — create, read, update, delete products owned by the authenticated user.
Backend deployed on Render. Frontend deployed on Vercel. Ensure CORS and environment variables are configured to permit communication between the two.


## Authentication
Scheme: Bearer token in the Authorization header.
Header format: Authorization: Bearer <JWT>

# Token content (claims):
- userId — the authenticated user's unique ID.
- username — username at issuance.
- Standard JWT claims (exp, iat).

Protected endpoints: All /products routes and GET /auth/me.
If the token is missing, expired, or invalid, endpoints will respond with 401 Unauthorized.

## Common HTTP behavior & headers
- Requests and responses use Content-Type: application/json.
- All request bodies must be valid JSON.
- Responses contain an envelope with either the requested resource(s) or an error object with a message field and, for debugging, optionally an error entry (in development only).
- Timezones and dates are ISO 8601 strings (UTC).
- Pagination (when applicable) uses page and limit query parameters

## Data models
# user
- id: string (ObjectId) — unique identifier (never exposed in plain text except in responses).
- username: string — required, unique.
- password: string — hashed; never returned in responses.
# product
- id: string (ObjectId) — unique identifier.
- name: string — required.
- description: string — required.
- category: string — required; allowed values: Electronics, Clothing, Books, Home, Other.
- inStock: boolean — default true.
- price: number — required; non-negative.
- discountPercent: number — default 0; 0–100.
- finalPrice: number — computed server-side (price minus calculated discount).
- createdBy: string (ObjectId) — owner user id; set server-side.
- createdAt / updatedAt: timestamps (if enabled).

## Endpoints
# Authentication / User

POST /auth/signup

Purpose: Register a new user and receive an access token.
Headers: Content-Type: application/json
Request body (JSON):
- username (string) — required
- password (string) — required
Responses
- 201 Created — returns { token, userId, username }.
- 400 Bad Request — when required fields are missing or username already exists.
- 500 Internal Server Error — server error.
Behavior & constraints
- Passwords are stored hashed; raw password is never returned.
- Token expiry: 24 hours.

POST /auth/login

Purpose: Authenticate existing user and receive an access token.
Headers: Content-Type: application/json
Request body (JSON):
- username (string) — required
- password (string) — required
Responses
- 200 OK — returns { token, userId, username }.
- 400 Bad Request — missing fields or invalid credentials.
- 500 Internal Server Error — server error.

GET /auth/me

Purpose: Retrieve the authenticated user profile (without password).
Headers: Authorization: Bearer <token>
Responses
- 200 OK — returns the user object (id, username, etc., password excluded).
- 401 Unauthorized — token missing/invalid.
- 500 Internal Server Error — server error.

# Products (all routes protected)
All product routes require Authorization: Bearer <token> header. The server enforces ownership: only products whose createdBy matches the authenticated userId are accessible.

GET /products
Query parameters:
- page (number) — default 1
- limit (number) — default 20
- category (string) — filter by category (Electronics, Clothing, Books, Home, Other)
- inStock (boolean) — filter by stock status
- sort (string) — e.g., price:asc, price:desc, createdAt:desc
Responses
- 200 OK — returns a paginated list of products plus pagination metadata: { items: [...], page, limit, totalItems, totalPages }.
- 401 Unauthorized — missing/invalid token.
- 500 Internal Server Error.

POST /products

Purpose: Create a new product. The server sets ownership and computes finalPrice.
Headers: Authorization: Bearer <token>, Content-Type: application/json
Request body (JSON):
- name (string) — required
- description (string) — required
- category (string) — required; allowed values: Electronics, Clothing, Books, Home, Other
- price (number) — required; must be >= 0
- discountPercent (number) — optional; default 0; range 0–100
- inStock (boolean) — optional; default true
Responses
- 201 Created — returns created product object with server-populated fields: id, createdBy, finalPrice, timestamps.
- 400 Bad Request — validation errors (missing fields, invalid enum, negative price, discount out of range).
- 401 Unauthorized — missing/invalid token.
- 500 Internal Server Error.

PUT /products/{id}
Purpose: Update a product owned by the authenticated user. The server recalculates finalPrice if price or discountPercent change.
Headers: Authorization: Bearer <token>, Content-Type: application/json
Path parameter
- id — product identifier to update.
Request body (JSON): Partial or full product fields to update:
- name (string)
- description (string)
- category (string) — must be valid enum if provided
- price (number) — if provided, must be >= 0
- discountPercent (number) — if provided, 0–100
- inStock (boolean)
Responses
- 200 OK — returns updated product object (with updated finalPrice).
- 400 Bad Request — validation errors.
- 401 Unauthorized — missing/invalid token.
- 404 Not Found — product not found or not owned by user.
- 500 Internal Server Error.

DELETE /products/{id}

Purpose: Delete a product owned by the authenticated user.
Headers: Authorization: Bearer <token>
Path parameter
- id — product identifier to delete.
Responses
- 200 OK — { message: "Product deleted successfully" }.
- 401 Unauthorized — missing/invalid token.
- 404 Not Found — product not found or not owned by user.
- 500 Internal Server Error.

## Operational & deployment notes
Environment variables (suggested):

MONGO_URI — MongoDB connection string.

JWT_SECRET — strong secret used to sign tokens.

NODE_ENV — production or development.

PORT — port for the server (Render assigns automatically).

FRONTEND_URL — frontend origin (Vercel) for CORS configuration.

# Render (backend)
Provision a Web Service with auto-deploy from your repository.
Set environment variables in the Render service settings.
Configure health checks and readiness probes.
Use managed MongoDB (Atlas) or add through Render’s managed databases.
# Vercel (frontend)
Add NEXT_PUBLIC_API_URL or similar env var that points to the Render backend.
Set production domain in Render CORS configuration.
# Monitoring & observability
Use structured logging and monitoring (e.g., Logflare, Datadog, Sentry).
Track errors, request latency, and authentication failures.
Export health and readiness endpoints for platform probing.

## Testing & API quality
- Provide a Postman collection or OpenAPI (Swagger) contract to consumers (server should maintain an up-to-date contract).

- Include automated tests:
Unit tests for business logic (finalPrice computation, auth).
Integration tests for endpoints (use an in-memory or test DB).
End-to-end tests that exercise the frontend-backend flow (login → create product → list products → update → delete).