# 🔗 Shortify – URL Shortener Application

Shortify is a modern **URL shortening platform** with secure authentication, OAuth support, click tracking, and a user-friendly dashboard.  
It is built with a **scalable backend** and a **high-performance frontend**, following real-world production practices.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- OAuth 2.0 login with:
  - Google
  - GitHub
  - Facebook
- Email & password authentication
- Secure API access using **Auth Guards**
- Cookie-based authentication (HTTP-only cookies)
- Session-based user handling

### ✂️ URL Shortening
- Create short URLs for long links
- Redirect short URLs to original URLs
- Track total clicks/visits
- Delete URLs securely (user-owned only)

### 📊 Dashboard
- View all shortened URLs for the logged-in user
- Table-based UI with:
  - Original URL (truncated with tooltip)
  - Short code
  - Full short URL
  - Total visits
  - Created date
  - Delete action

---

## 🛠️ Tech Stack

### Backend
- **NestJS**
- **Passport.js**
- **OAuth 2.0**
- **PostgreSQL**
- **Prisma ORM**
- Cookie-based authentication
- REST API architecture

### Frontend
- **Next.js**
- **Tailwind CSS**
- **Radix UI**
- **Redux Toolkit**
- Fetch API
- Secure cookie handling

---

## 🧩 Project Architecture
```
backend/
 ├── src/
 │ ├── auth/
 │ ├── dashboard/
 │ ├── prisma/
 │ └── main.ts
 └── prisma/


frontend/
 ├── app/
 ├── components/
 ├── redux/
 └── services/
```


---

## 🔑 Authentication Flow

1. User logs in using OAuth (Google / GitHub / Facebook) or Email & Password
2. Backend validates user via Passport strategy
3. Server sets **HTTP-only cookie**
4. Frontend sends requests with `credentials: "include"`
5. Auth Guard protects all private APIs
6. User session is validated on every request

---

## 🌐 API Endpoints

### Check Open Api - Swagger - show all Api Endpoints this url
### ***``` https://technext-server.onrender.com/doc ```

### 🔐 Auth APIs

| Method | Endpoint |
|------|---------|
| GET | `/auth/google/login` |
| GET | `/auth/google/callback` |
| GET | `/auth/github/login` |
| GET | `/auth/github/callback` |
| GET | `/auth/facebook/login` |
| GET | `/auth/facebook/callback` |
| POST | `/auth/registration` |
| POST | `/auth/login` |
| GET | `/auth/logout` |
| GET | `/auth/me` |

---

### 🔗 Short URL APIs (Protected)

| Method | Endpoint | Description |
|------|--------|------------|
| POST | `/dashboard/create/short-url` | Create a short URL |
| GET | `/dashboard/get-all-urls` | Get all user URLs |
| GET | `/dashboard/get-url/:code` | Get single URL details |
| GET | `/dashboard/delete/:code` | Delete a URL |

---

## 🔁 URL Redirection Logic

- User visits: `https://shortify.com/abc123`
- Backend:
  - Finds original URL
  - Increments visit count
  - Redirects to long URL
- Click tracking is stored in the database

---

## 🖥️ Frontend ↔ Backend Integration

### API Requests (Frontend)

### NEXTJS FRONTEND APPLICTION THIS URL
- ### code base ***``` https://github.com/uforco/technextapp ```
- ### Line Url ***``` https://technextapp-nu.vercel.app ```

```ts
fetch(`${API_BASE_URL}/dashboard`, {
  method: "GET",
  credentials: "include"
});
```


## ENV

```
NODE_ENV=development
PORT=3000
HOST=0.0.0.0
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=technext_db
DB_HOST=db
DB_PORT=5437

DATABASE_URL="postgresql://postgres:password@localhost:5437/technext_db?schema=public"

#JWT Secret
JWT_SECRET=''

# Google OAuth Credentials
GOOGLE_CLIENT_ID=''
GOOGLE_CLIENT_SECRET=''

#github OAuth Credentials
GITHUB_ID=''
GITHUB_SECRET=''

#facebook 0auth Credentials
FACEBOOK_CLIENT_ID=''
FACEBOOK_CLIENT_SECRET=''

FORTEND_URL=http://localhost:3001
BACKEND_URL=http://localhost:3000
```
