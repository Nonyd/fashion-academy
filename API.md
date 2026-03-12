# PFA Portal API Reference (v1)

Base URL: `/api/v1`

All responses follow: `{ success: boolean, message: string, data?: T, error?: string, errors?: Record<string, string[]>, meta?: { page, limit, total, totalPages } }`

---

## Auth

### POST /api/v1/auth/login
**Access:** Public  
**Body:** `{ "email": "string", "password": "string" }`  
**Response 200:** `{ success: true, data: { user: AuthSession, token: string, expiresAt: string } }`  
**Errors:** 401 Invalid credentials

### POST /api/v1/auth/logout
**Access:** Public  
**Response 200:** `{ success: true }`

### POST /api/v1/auth/change-password
**Access:** Bearer token required  
**Body:** `{ "currentPassword": "string", "newPassword": "string", "confirmPassword": "string" }`  
**Response 200:** `{ success: true }`  
**Errors:** 401 Unauthorized, 422 Validation failed

### POST /api/v1/auth/forgot-password
**Access:** Public  
**Body:** `{ "email": "string" }`  
**Response 200:** `{ success: true, data: { message: "..." } }`

### GET /api/v1/auth/me
**Access:** Bearer token required  
**Response 200:** `{ success: true, data: UserProfile }`  
**Errors:** 401 Unauthorized

---

## Assets

### GET /api/v1/assets
**Access:** Public  
**Response 200:** `{ success: true, data: Record<AssetType, { url }> }`

### GET /api/v1/assets/[type]
**Access:** Public  
**Response:** Streams file with Content-Type and Cache-Control: public, max-age=86400  
**Types:** logo, logo-white, logo-dark, favicon, favicon-32, favicon-16, og-image

### PUT /api/v1/assets/[type]
**Access:** MANAGEMENT  
**Body:** multipart form (file)  
**Response:** 501 in this build

---

## Students

### GET /api/v1/students
**Access:** MANAGEMENT  
**Query:** page, limit, search, program, intakeYear, enrollmentStatus  
**Response 200:** Paginated student list

### GET /api/v1/students/me/dashboard
**Access:** STUDENT  
**Response 200:** `{ success: true, data: StudentDashboardData }`

### GET /api/v1/students/[id]
**Access:** MANAGEMENT, TEACHER, or STUDENT (own only)  
**Response 200:** Full student record

---

## Teachers

### GET /api/v1/teachers
**Access:** MANAGEMENT  
**Query:** page, limit, search  
**Response 200:** Paginated teacher list

---

## Management

### GET /api/v1/management/dashboard
**Access:** MANAGEMENT  
**Response 200:** `{ success: true, data: { stats, admissionFunnel, revenueByMonth, recentAdmissions, recentPayments, systemAlerts } }`

---

## Admissions

### POST /api/v1/admissions
**Access:** Public  
**Body:** createAdmissionSchema (firstName, lastName, email, phone, country, program, intakeYear, statementOfPurpose, ...)  
**Response 200:** `{ success: true, data: { admission, paymentInit } }`

### GET /api/v1/admissions
**Access:** MANAGEMENT  
**Query:** page, limit, status, paymentStatus, program, intakeYear, search  
**Response 200:** Paginated admissions

### GET /api/v1/admissions/stats
**Access:** MANAGEMENT  
**Response 200:** Pipeline counts by status

---

## Courses

### GET /api/v1/courses
**Access:** MANAGEMENT, TEACHER, STUDENT  
**Query:** page, limit, program, semester, teacherId  
**Response 200:** Paginated courses

---

## Scores

### POST /api/v1/scores
**Access:** TEACHER  
**Body:** `{ studentId, courseId, score (0-100), assessmentType, semester, feedback? }`  
**Response 200:** Created score

### GET /api/v1/scores
**Access:** MANAGEMENT  
**Query:** page, limit, studentId, courseId, semester, assessmentType  
**Response 200:** Paginated scores

---

## Payments

### POST /api/v1/payments/initialize
**Access:** Public  
**Body:** `{ amount, currency?, purpose, email, name, admissionId?, studentId? }`  
**Response 200:** `{ success: true, data: { authorization_url, reference } }`

---

## Notifications

### GET /api/v1/notifications
**Access:** Bearer required  
**Query:** page, limit  
**Response 200:** `{ success: true, data: { items, total } }`

---

## Settings

### GET /api/v1/settings/public
**Access:** Public  
**Response 200:** Safe public settings (academy_name, academy_email, admissions_open, asset_logo, etc.)

---

## Reports

### GET /api/v1/reports/academic
**Access:** MANAGEMENT  
**Query:** program?, semester?  
**Response 200:** Academic report (scores, byCourse)

---

For full route list see `app/api/v1/` directory structure.
