# Smart Bed Allocation System - Detailed ERD

## **Visual Entity Relationship Diagram**

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                USERS                                          │
├─────────────────────────────────────────────────────────────────────────────────┤
│ PK: _id (ObjectId)                                                           │
│ UK: email (String)                                                           │
│     name (String)                                                            │
│     password (String) - hashed                                               │
│     phone (String) - 10 digits                                               │
│     role (String) - "patient" | "admin"                                      │
│     isVerified (Boolean)                                                     │
│     isActive (Boolean)                                                       │                                                                                             │
│      createdAt (Date)                                                         │
│     updatedAt (Date)                                                         │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        │ 1:1
                                        ▼
┌─────────────────────────────────┐  ┌─────────────────────────────────┐
│        ADMIN_PROFILES          │  │       PATIENT_PROFILES          │
├─────────────────────────────────┤  ├─────────────────────────────────┤
│ PK: _id (ObjectId)             │  │ PK: _id (ObjectId)             │
│ FK: userId (ObjectId)          │  │ FK: userId (ObjectId)          │
│     hospitalName (String)      │  │     dateOfBirth (Date)         │
│     hospitalCity (String)      │  │     bloodGroup (String)        │
│     location (GeoJSON Point)   │  │     gender (String)            │
│     address (String)           │  │     emergencyContact (Object)   │
│     contactPerson (String)     │  │     medicalHistory (Array)      │
│     hospitalType (String)      │  │     allergies (Array)           │        │
│     totalBeds (Number)         │  │     currentMedications (Array)  │
│     availableBeds (Number)     │  │     height (Number) - cm        │
│     emergencyContact (Object)  │  │     weight (Number) - kg        │
│                                │  │     address (Object)            │
│     isVerified (Boolean)       │  │     occupation (String)         │
│     verificationDocuments (Array)│ │     maritalStatus (String)      │
│     createdAt (Date)           │  │     isActive (Boolean)          │
│     updatedAt (Date)           │  │     createdAt (Date)            │
└─────────────────────────────────┘  │     updatedAt (Date)            │
         │                           └─────────────────────────────────┘
         │ 1:Many                           │
         ▼                                  │
┌─────────────────────────────────┐        │
│           DOCTORS              │        │
├─────────────────────────────────┤        │
│ PK: _id (ObjectId)             │        │
│ FK: userId (ObjectId)          │        │
│ FK: hospitalId (ObjectId)      │        │
│     specialization (String)    │        │
│                                │        │
│     experience (Number)        │        │
│     qualification (String)     │        │
│     shift (String)             │        │
│     consultationFee (Number)   │        │
│     availability (Object)      │        │
│     contactInfo (Object)       │        │
│     isActive (Boolean)         │        │
│     isVerified (Boolean)       │        │
│     rating (Number)            │        │
│     totalReviews (Number)      │        │
│     bio (String)               │        │
│     languages (Array)          │        │
│     awards (Array)             │        │
│     publications (Array)       │        │
│     createdAt (Date)           │        │
│     updatedAt (Date)           │        │
└─────────────────────────────────┘        │
         │                                 │
         │ 1:Many                         │
         ▼                                │
┌─────────────────────────────────┐       │
│            BEDS                 │       │
├─────────────────────────────────┤       │
│ PK: _id (ObjectId)             │       │
│     bedNumber (String)         │       │
│ FK: hospitalId (ObjectId)      │       │
│     ward (String)              │       │
│     bedType (String)           │       │
│     status (String)            │       │
│ FK: currentPatient (ObjectId)  │       │
│ FK: assignedDoctor (ObjectId)  │       │
│     pricePerDay (Number)       │       │
│     facilities (Array)         │       │
│     isActive (Boolean)         │       │
│     lastCleaned (Date)         │       │
│     nextCleaning (Date)        │       │
│     notes (String)             │       │
│     createdAt (Date)           │       │
│     updatedAt (Date)           │       │
└─────────────────────────────────┘       │
         │                                │
         │ Many:Many                      │
         ▼                                │
┌─────────────────────────────────┐       │
│      BED_ASSIGNMENTS           │       │
├─────────────────────────────────┤       │
│ PK: _id (ObjectId)             │       │
│ FK: bedId (ObjectId)           │       │
│ FK: patientId (ObjectId)       │       │
│ FK: doctorId (ObjectId)        │       │
│ FK: hospitalId (ObjectId)      │       │
│ FK: assignedBy (ObjectId)      │       │
│     assignmentDate (Date)      │       │
│     expectedDischargeDate (Date)│      │
│     actualDischargeDate (Date) │       │
│     status (String)            │       │
│     reason (String)            │       │
│     notes (String)             │       │
│     totalAmount (Number)       │       │
│     paymentStatus (String)     │       │
│     createdAt (Date)           │       │
│     updatedAt (Date)           │       │
└─────────────────────────────────┘       │
         │                                │
         │                                │
         └────────────────────────────────┘
                    │
                    │ 1:Many
                    ▼
┌─────────────────────────────────┐  ┌─────────────────────────────────┐
│     EMERGENCY_SIGNALS          │  │         WAITLIST                │
├─────────────────────────────────┤  ├─────────────────────────────────┤
│ PK: _id (ObjectId)             │  │ PK: _id (ObjectId)             │
│ FK: patientId (ObjectId)       │  │ FK: patientId (ObjectId)       │
│ FK: hospitalId (ObjectId)      │  │ FK: hospitalId (ObjectId)      │
│     signalType (String)        │  │     bedType (String)           │
│     priority (String)          │  │     priority (String)           │
│     location (GeoJSON Point)   │  │     reason (String)            │
│     description (String)       │  │     status (String)            │
│     status (String)            │  │     position (Number)          │
│ FK: acknowledgedBy (ObjectId)  │  │     estimatedWaitTime (Number) │
│     acknowledgedAt (Date)      │  │ FK: offeredBed (ObjectId)      │
│     resolvedAt (Date)          │  │     offeredAt (Date)           │
│     responseTime (Number)      │  │     acceptedAt (Date)          │
│     createdAt (Date)           │  │     cancelledAt (Date)         │
│     updatedAt (Date)           │  │     createdAt (Date)           │
└─────────────────────────────────┘  │     updatedAt (Date)           │
         │                           └─────────────────────────────────┘
         │ 1:Many
         ▼
┌─────────────────────────────────┐
│        NOTIFICATIONS           │
├─────────────────────────────────┤
│ PK: _id (ObjectId)             │
│ FK: userId (ObjectId)          │
│     type (String)              │
│     title (String)             │
│     message (String)           │
│     isRead (Boolean)           │
│     priority (String)          │
│     relatedId (ObjectId)       │
│     relatedType (String)       │
│     expiresAt (Date)           │
│     createdAt (Date)           │
│     updatedAt (Date)           │
└─────────────────────────────────┘
```

## **Relationship Mapping**

### **Primary Relationships:**

1. **USERS → ADMIN_PROFILES** (1:1)
   - One user can have one admin profile
   - Admin profile extends user with hospital information

2. **USERS → PATIENT_PROFILES** (1:1)
   - One user can have one patient profile
   - Patient profile extends user with medical information

3. **USERS → DOCTORS** (1:1)
   - One user can have one doctor profile
   - Doctor profile extends user with medical credentials

4. **ADMIN_PROFILES → DOCTORS** (1:Many)
   - One hospital can employ many doctors
   - Doctors belong to specific hospitals

5. **ADMIN_PROFILES → BEDS** (1:Many)
   - One hospital can have many beds
   - Beds are organized by wards and types

6. **BEDS ↔ PATIENT_PROFILES** (Many:Many through BED_ASSIGNMENTS)
   - Patients can be assigned to multiple beds over time
   - Beds can have multiple patients over time

7. **DOCTORS ↔ BEDS** (Many:Many through BED_ASSIGNMENTS)
   - Doctors can be assigned to multiple beds
   - Beds can have different doctors assigned

### **Secondary Relationships:**

8. **PATIENT_PROFILES → EMERGENCY_SIGNALS** (1:Many)
   - Patients can send multiple emergency signals
   - Signals are tracked with priority and status

9. **PATIENT_PROFILES → WAITLIST** (1:Many)
   - Patients can join multiple waitlists
   - Waitlist tracks position and estimated wait time

10. **USERS → NOTIFICATIONS** (1:Many)
    - Users receive multiple notifications
    - Notifications are categorized by type and priority

## **Key Design Patterns:**

### **1. Role-Based Access Control (RBAC)**
- Single Users table with role field
- Separate profile tables for different roles
- Unified authentication system

### **2. Geospatial Support**
- Location fields use GeoJSON Point format
- Enables proximity-based queries
- Supports emergency signal location tracking

### **3. Audit Trail**
- All entities have createdAt/updatedAt timestamps
- Tracks assignment history and status changes
- Maintains data integrity and compliance

### **4. Status Management**
- Beds: Available, Occupied, Cleaning, Maintenance, Reserved
- Assignments: Active, Discharged, Transferred, Emergency
- Signals: Pending, Acknowledged, Resolved, Cancelled
- Waitlist: Waiting, Offered, Accepted, Cancelled

### **5. Notification System**
- Centralized notification management
- Type-based categorization
- Priority-based delivery
- Expiration handling

## **Performance Optimizations:**

### **Indexes:**
```javascript
// Geospatial indexes
{ location: "2dsphere" } // AdminProfiles, EmergencySignals

// Unique indexes
{ email: 1 } // Users
{ licenseNumber: 1 } // AdminProfiles, Doctors

// Compound indexes
{ hospitalId: 1, ward: 1 } // Beds
{ hospitalId: 1, status: 1 } // Beds
{ userId: 1, role: 1 } // Users

// Status-based indexes
{ status: 1 } // Beds, Assignments, Signals
{ isActive: 1 } // Users, Profiles, Doctors
{ isVerified: 1 } // Users, AdminProfiles, Doctors
```

### **Query Optimization:**
- Efficient bed availability queries
- Fast patient assignment lookups
- Quick emergency signal processing
- Optimized waitlist management 