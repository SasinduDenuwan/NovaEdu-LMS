<div align="center">

  <img src="https://img.shields.io/badge/v1.0.0-Release-blue?style=flat-square" alt="Version">
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/Status-Active_Development-orange?style=flat-square" alt="Status">

  <h1>🎓 NovaEdu LMS</h1>
  
  <h3><i>Empowering Education with Intelligent Technology</i></h3>

  <p width="80%">
    <b>NovaEdu</b> is a production-grade, full-stack Learning Management System crafted to bridge the gap between instructors and students. 
    Featuring <b>AI-driven assistance</b>, real-time analytics, and a seamless e-commerce experience, it sets a new standard for online education platforms.
  </p>

  <h3>🚀 Deployed Applications</h3>
  <p>
    <strong>Frontend Host:</strong><br>
    <a href="https://lms-fe-lrhe.vercel.app/" target="_blank">https://lms-fe-lrhe.vercel.app/</a>
    <br><br>
    <strong>Backend API Host:</strong><br>
    <a href="https://lms-be-tau.vercel.app/" target="_blank">https://lms-be-tau.vercel.app/</a>
  </p>

  <p>
    <a href="#-features"><b>Explore Features</b></a> •
    <a href="#-tech-arsenal"><b>Tech Stack</b></a> •
    <a href="#-visual-tour"><b>Visual Tour</b></a> •
    <a href="#-getting-started"><b>Deploy Now</b></a>
  </p>

</div>

<br />

---

## 🌟 Comprehensive Feature List

This project is a feature-rich platform designed for scalability and user experience. Below is a detailed breakdown of all implemented functionalities across the system.

### 🔐 Authentication & Security
*   **Secure Registration**: User signup with firstname, lastname, email, and password. Generates hashed passwords using `bcryptjs`.
*   **JWT Authentication**: Stateless authentication using JSON Web Tokens (Access & Refresh tokens).
*   **Role-Based Access Control (RBAC)**: Distinct permissions for `STUDENT`, `INSTRUCTOR`, and `ADMIN` roles.
*   **Password Recovery**: Secure "Forgot Password" flow via Email OTP (using Nodemailer).
*   **Session Management**: Auto-logout and token refresh mechanisms.
*   **Protected Routes**: Middleware (`auth.middleware.ts`) ensures only authorized users access sensitive endpoints.

### 🎓 Student Portal Features
*   **Interactive Dashboard**:
    *   **Personalized Greeting**: Dynamic welcome message based on time/user data.
    *   **Learning Stats**: Track "Hours Learned", "Courses Enrolled", "Resources Accessed", and "Learning Streak".
    *   **Continue Learning**: Quick access to recently accessed courses.
*   **Course Discovery & Enrollment**:
    *   **Course Browsing**: View all available courses with details like Rating, Duration, Level (Beginner/Intermediate), and Category.
    *   **Advance Filtering**: Search and filter courses by category.
    *   **Shopping Cart**: Add courses to cart, view total price, and manage wishlist items.
    *   **Seamless Checkout**: Integrated payment processing flow creating orders and invoices.
*   **Immersive Learning Experience**:
    *   **Video Player**: Custom video player supporting YouTube embeds (`getEmbedUrl` utility) for seamless playback.
    *   **Lesson Navigation**: Sidebar navigation to switch between lessons and video clips.
    *   **Progress Tracking**: Real-time progress bar showing course completion percentage.
    *   **Resource Hub**: Downloadable course materials (PDF, ZIP, DOC) directly from the dashboard.
*   **User Profile Management**:
    *   **Edit Profile**: Update personal details (Name, Address, Mobile) and upload profile pictures.
    *   **Order History**: View past purchases and transaction status.

### 🎛 Administrative Control Center
*   **Dashboard & Analytics**:
    *   **Visual Charts**: Integrated `Recharts` for "Revenue Trends", "Student Growth", and "Course Sales".
    *   **KPI Cards**: Quick view of Total Revenue, Total Students, Active Instructors, and Total Courses.
*   **User Management**:
    *   **Student Management**: View all enrolled students, search by name, delete/ban users, and export student lists to PDF.
    *   **Instructor Management**: Add new instructors (with photo upload), update bio/experience, and track their performance (Student count/Course count).
*   **Course Management (CMS)**:
    *   **Course Creation Wizard**: Form to add Course Title, Description, Price, Level, Category, and assign Instructors.
    *   **Media Management**: Upload course thumbnails (Cloudinary integration) and manage video links.
    *   **Rich Content**: Support for adding resources and structuring lessons.
    *   **CRUD Operations**: Full Edit/Delete capabilities for existing courses.
*   **Financial Hub**:
    *   **Payment Tracking**: View all transaction logs with Status (Completed/Failed), Transaction IDs, and associated Students.
    *   **Reporting**: specific "Export to PDF" functionality for financial records.

### 🤖 AI-Powered Assistant
*   **Smart Tutor**: Integrated AI Chatbot powered by **OpenRouter**.
*   **Contextual Help**: Floating AI button allowing students to ask questions about course content anytime.
*   **Natural Language Processing**: Understands student queries and provides instant, relevant answers.

### ⚙️ Backend Logic & System Features
*   **Automated Statistics**:
    *   **Instructor Stats**: Auto-increments "Student Count" for an instructor when their course is purchased (`order.controller.ts`).
    *   **Course Counts**: Auto-increments "Course Count" for instructors when new courses are assigned (`course.controller.ts`).
*   **Cloud Storage**: Integration with **Cloudinary** for scalable image hosting (Profile pics, Course thumbnails).
*   **Database Optimization**: efficiently structured MongoDB schemas with Mongoose relationships (`populate` methods for joining Courses, Instructors, and Videos).

<br />

## 🏗 Advanced System Architecture

The following diagram illustrates the high-level architecture of NovaEdu LMS, showcasing the interaction between client applications, the backend API, database, and external services.

```mermaid
graph TD
    subgraph Client ["🖥️ Client Layer (Frontend)"]
        Student["Student Portal"]
        Instructor["Instructor Portal"]
        Admin["Admin Dashboard"]
    end

    subgraph Server ["⚙️ Backend Layer (Node.js + Express)"]
        API["REST API Routes"]
        Auth["Auth Middleware"]
        Controllers["Business Logic"]
    end

    subgraph Data ["💾 Data Persistence"]
        DB[("MongoDB Atlas")]
    end

    subgraph External ["☁️ External Services"]
        Cloudinary["Cloudinary (Media)"]
        AI["OpenRouter (AI Tutor)"]
        Email["Nodemailer (SMTP)"]
    end

    Student -->|HTTP Requests| API
    Instructor -->|HTTP Requests| API
    Admin -->|HTTP Requests| API
    
    API --> Auth
    Auth --> Controllers
    
    Controllers <-->|Mongoose ODM| DB
    
    Controllers -->|Image Uploads| Cloudinary
    Controllers -->|AI Completion| AI
    Controllers -->|Send Notifications| Email
```

<br />

## 🔄 Data Flow Diagram

This sequence diagram depicts the typical data flow for a user request, detailing the authentication, processing, and external service integration steps.

```mermaid
sequenceDiagram
    autonumber
    actor User as 👤 User
    participant FE as 🖥️ Frontend
    participant API as ⚙️ Backend API
    participant DB as 💾 Database
    participant Ext as ☁️ External Services

    User->>FE: Performs Action (e.g., Enroll)
    FE->>FE: Validate Input
    FE->>API: Send Request (with JWT)
    
    activate API
    API->>API: Verify Auth Token
    
    alt Unauthorized
        API-->>FE: 401 Unauthorized
        FE-->>User: Redirect to Login
    else Authorized
        API->>DB: Query Data / Check Permissions
        activate DB
        DB-->>API: Return Data
        deactivate DB
        
        opt External Interaction
            API->>Ext: Call API (e.g., Cloudinary/AI)
            Ext-->>API: Response
        end
        
        API->>DB: Update/Save Records
        
        API-->>FE: Return Success Response
    end
    deactivate API
    
    FE-->>User: Update UI / Show Notification
```

<br />

## 🛠 Tech Arsenal

<div align="center">

| Frontend | Backend | Tools & DevOps |
| :---: | :---: | :---: |
| ![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) | ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) |
| ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) | ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) | ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) |
| ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) | ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) | ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white) |
| ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white) | ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) |
| ![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white) | | |

</div>

<br/>

<div align="center">
  <b>💎 Specialized Libraries</b>
  <br/><br/>

| Library | Badge | Library | Badge |
| :---: | :---: | :---: | :---: |
| **Recharts** | ![Recharts](https://img.shields.io/badge/Recharts-22b5bf?style=for-the-badge&logo=recharts&logoColor=white) | **Cloudinary** | ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white) |
| **JSPDF** | ![JSPDF](https://img.shields.io/badge/jspdf-EF5B25?style=for-the-badge&logo=adobeacrobatreader&logoColor=white) | **Nodemailer** | ![Nodemailer](https://img.shields.io/badge/Nodemailer-00d1b2?style=for-the-badge&logo=nodemailer&logoColor=white) |
| **SweetAlert2** | ![SweetAlert2](https://img.shields.io/badge/SweetAlert2-EE4351?style=for-the-badge&logo=npm&logoColor=white) | **BCrypt** | ![Bcrypt](https://img.shields.io/badge/Bcrypt.js-222222?style=for-the-badge&logo=npm&logoColor=red) |
| **Lucide React** | ![Lucide](https://img.shields.io/badge/Lucide_React-F05133?style=for-the-badge&logo=lucide&logoColor=white) | **Node-Cron** | ![NodeCron](https://img.shields.io/badge/Node_Cron-2FAB22?style=for-the-badge&logo=nodedotjs&logoColor=white) |
| **Hot Toast** | ![HotToast](https://img.shields.io/badge/React_Hot_Toast-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) | **OpenRouter** | ![OpenRouter](https://img.shields.io/badge/OpenRouter-6F41D3?style=for-the-badge&logo=openai&logoColor=white) |

</div>

<br />

## 📂 Project Structure

A quick look at the top-level files and directories.

```text
LMS/
├── lms-be/                 # Backend (Node.js/Express)
│   ├── src/
│   │   ├── config/         # DB, Cloudinary & Email configs
│   │   ├── controllers/    # Business logic (Auth, Course, Order...)
│   │   ├── middleware/     # Auth checks & error handling
│   │   ├── models/         # Mongoose Schemas (User, Course...)
│   │   ├── routes/         # API endpoints definitions
│   │   ├── utils/          # Helpers (Tokens, PDF, Validation)
│   │   └── index.ts        # Server entry point
│   ├── .env.example
│   └── package.json
│
├── lms-fe/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # Global state (AuthContext)
│   │   ├── pages/          # Full application views
│   │   ├── services/       # API integration services
│   │   ├── utils/          # Formatters & helper functions
│   │   ├── App.tsx         # Main routing configuration
│   │   └── main.tsx        # Application entry point
│   ├── index.css           # Global styles (Tailwind imports)
│   └── package.json
│
└── README.md
```

<br />

## 📸 Visual Tour

<details open>
<summary><b>🏠 Public Pages & Authentication</b></summary>
<br>
<div align="center">
  <img src="./LMS/screenshots/homePage.png" width="48%" alt="Home Page" style="border-radius: 8px;" />
  <img src="./LMS/screenshots/homePageCourses.png" width="48%" alt="Courses Page" style="border-radius: 8px;" />
  <br/><br/>
  <img src="./LMS/screenshots/login.png" width="30%" alt="Login Page" style="border-radius: 8px;" />
  <img src="./LMS/screenshots/signup.png" width="30%" alt="Signup Page" style="border-radius: 8px;" />
  <img src="./LMS/screenshots/homePageInstructors.png" width="30%" alt="Instructors Page" style="border-radius: 8px;" />
</div>
</details>

<br/>

<details>
<summary><b>🎓 Student Portal Experience</b></summary>
<br>
<div align="center">
  <img src="./LMS/screenshots/studentDashboard.png" width="80%" alt="Student Dashboard" style="border-radius: 8px;" />
  <br/><br/>
  <img src="./LMS/screenshots/courseVideoWatch.png" width="48%" alt="Video Player" style="border-radius: 8px;" />
  <img src="./LMS/screenshots/studentNotes.png" width="48%" alt="Student Notes" style="border-radius: 8px;" />
  <br/><br/>
  <img src="./LMS/screenshots/courseInStudentDashboard.png" width="48%" alt="Course View" style="border-radius: 8px;" />
  <img src="./LMS/screenshots/studentProfileChange.png" width="48%" alt="Profile Settings" style="border-radius: 8px;" />
  <br/><br/>
  <img src="./LMS/screenshots/cartInStudent.png" width="32%" alt="Shopping Cart" style="border-radius: 8px;" />
  <img src="./LMS/screenshots/checkoutStudent.png" width="32%" alt="Checkout" style="border-radius: 8px;" />
  <img src="./LMS/screenshots/paymentSection.png" width="32%" alt="Payment Section" style="border-radius: 8px;" />
</div>
</details>

<br/>

<details>
<summary><b>🛠️ Administrative Control Center</b></summary>
<br>
<div align="center">
  <img src="./LMS/screenshots/adminDashboard.png" width="80%" alt="Admin Dashboard" style="border-radius: 8px;" />
  <br/><br/>
  <img src="./LMS/screenshots/coursesInAdminSide.png" width="80%" alt="Courses Grid" style="border-radius: 8px;" />
  <br/><br/>
  <img src="./LMS/screenshots/coursesAdminSide.png" width="48%" alt="Courses List" style="border-radius: 8px;" />
  <img src="./LMS/screenshots/addCourseAdminSide.png" width="48%" alt="Add Course" style="border-radius: 8px;" />
  <br/><br/>
  <img src="./LMS/screenshots/instructorsInAdminSide.png" width="48%" alt="Instructors List" style="border-radius: 8px;" />
  <img src="./LMS/screenshots/addInstructorAdminSide.png" width="48%" alt="Add Instructor" style="border-radius: 8px;" />
  <br/><br/>
  <img src="./LMS/screenshots/paymentAdminSide.png" width="48%" alt="Payment Management" style="border-radius: 8px;" />
  <img src="./LMS/screenshots/studentAdminSide.png" width="48%" alt="Student Management" style="border-radius: 8px;" />
  <br/><br/>
  <img src="./LMS/screenshots/addNewStudent.png" width="48%" alt="Add Student" style="border-radius: 8px;" />
</div>
</details>

<br />

## ⚙️ Getting Started

To run this project locally, follow these steps:

### 1️⃣ Clone & Install
```bash
git clone https://github.com/your-username/novaedu.git
cd LMS
```

### 2️⃣ Backend Configuration
```bash
cd lms-be
npm install
```
Create a `.env` file in `lms-be` with your credentials:
```env
PORT=5000
MONGO_URI=mongodb+srv://<your-db>
JWT_SECRET=supersecretkey
JWT_REFRESH_SECRET=superrefreshsecret
CLOUDINARY_URL=cloudinary://your_key:your_secret@your_cloud_name
OPENROUTER_API_KEY=your_openrouter_key
GMAIL_USER=your_email@gmail.com
```
Start the server:
```bash
npm run dev
```

### 3️⃣ Frontend Launch
```bash
cd ../lms-fe
npm install
npm run dev
```
OPEN `http://localhost:5173` to view it in the browser.

<br/>

---

<div align="center">

  <h3><b>Designed & Developed by Sasindu Denuwan</b></h3>
  <p>
    <a href="https://github.com/SasinduDenuwan" target="_blank">
      <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
    </a>
    <a href="https://www.linkedin.com/in/sasindu-denuwan-276b242a1/" target="_blank">
      <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
    </a>
  </p>
  <p><i>© 2026 NovaEdu LMS. All Rights Reserved.</i></p>

</div>
