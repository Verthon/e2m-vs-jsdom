# Medical Appointment Booking - PRD v0.2

## 1. Document Info

- **Version:** 0.2
- **Date:** 2025-02-06
- **Status:** Draft - MVP Scope Only

---

## 2. MVP Scope

### 2.1 In Scope

- Login (mock authentication)
- Book appointment flow (5 steps)
- View appointments list
- Cancel appointment

### 2.2 Out of Scope

- User registration
- Password reset
- Profile editing
- Payment processing
- Insurance verification
- Prescription management

---

## 3. Status Definitions

### 3.1 Appointment Status (appointmentStatus: string)

| Status | Description |
|--------|-------------|
| confirmed | Appointment booked, awaiting date |
| cancelled | Cancelled by patient |
| completed | Appointment occurred (past date) |

### 3.2 Appointment Types (appointmentTypeId: string)

| ID | Name | Duration (min) |
|----|------|----------------|
| lab | Lab Work | 15 |
| followup | Follow-up Visit | 30 |
| physical | Annual Physical | 60 |
| newpatient | New Patient Consultation | 60 |

---

## 4. Functional Requirements

### 4.1 Login Screen (/login)

| ID | Requirement | Data Source |
|----|-------------|-------------|
| FR.AUTH.01 | Display email input field (type=email, required) | - |
| FR.AUTH.02 | Display password input field (type=password, required) | - |
| FR.AUTH.03 | Display "Login" button | - |
| FR.AUTH.04 | Accept any email ending with @test.com + password "test123" | Hardcoded |
| FR.AUTH.05 | Reject all other credentials with error "Invalid credentials" | Hardcoded |
| FR.AUTH.06 | On success: redirect to /book | - |
| FR.AUTH.07 | Display "Forgot password?" link (disabled/grayed out) | - |

---

### 4.2 Select Appointment Type (/book)

| ID | Requirement | Data Source |
|----|-------------|-------------|
| FR.TYPE.01 | Display page title "What brings you in?" | - |
| FR.TYPE.02 | Display 4 appointment type cards (radio selection) | Static list (see 3.2) |
| FR.TYPE.03 | Each card shows: name, duration badge, description | Static |
| FR.TYPE.04 | "Continue" button disabled until selection made | - |
| FR.TYPE.05 | On Continue: navigate to /book/provider with selected typeId | - |

**Card Descriptions:**

| typeId | description |
|--------|-------------|
| lab | Blood draw, urinalysis, specimen collection |
| followup | Review test results or treatment progress |
| physical | Comprehensive health examination |
| newpatient | First-time visit and health history |

---

### 4.3 Select Provider (/book/provider)

| ID | Requirement | Data Source |
|----|-------------|-------------|
| FR.PROV.01 | Display page title "Select a provider" | - |
| FR.PROV.02 | Display 3-5 provider cards (radio selection) | Static list 3-5 records |
| FR.PROV.03 | Each card shows: photo, name, credentials, specialty, "Next available: {date}" | Static |
| FR.PROV.04 | "Next available" date is random between today+1 and today+14 | Generated |
| FR.PROV.05 | "Continue" button disabled until selection made | - |
| FR.PROV.06 | On Continue: navigate to /book/slots with selected typeId and providerId | - |

**Provider Static Data:**

| providerId | name | credentials | specialty |
|------------|------|-------------|-----------|
| p1 | Dr. Sarah Chen | MD | Family Medicine |
| p2 | Dr. Michael Ross | DO | Internal Medicine |
| p3 | Dr. Emily Parker | NP | Family Practice |

---

Continue with 4.4 Select Date/Time or adjust?
