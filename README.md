# Project Management Application

## Introduction

The **Project Management Application** is a comprehensive tool designed to streamline project management and collaboration. It is divided into two main sections: **Admin** and **User**. Each section offers distinct features and functionalities to help manage projects, tasks, and users efficiently.

---

## 1. Admin Panel

### Auth Module
- Admin users can log in and manage the application.
  
### Dashboard
The admin dashboard provides an overview of various activities and statistics:
- **Task Status Charts**: Visual representation of tasks based on their status (To-Do, In-Progress, Done).
- **User Status Charts**: Visual representation of user activity (Active, Not Active).
  
### Project Management (CRUD)
Admins have full control over managing projects:
- **Create, Read, Update, Delete (CRUD) projects**.
- For each project, admins can set:
  - **Title**: Name of the project.
  - **Description**: A brief explanation of the project.
  - **Users List**: Dropdown multi-select to assign users to the project.
  - **Tasks List**: Dropdown multi-select to assign tasks related to the project.

### Task Management (CRUD)
Manage individual tasks within projects:
- **Create, Read, Update, Delete (CRUD) tasks**.
- Each task includes:
  - **Title**: Name of the task.
  - **Description**: Details of the task.
  - **Status**: Track progress (To-Do, In-Progress, Done).

### User Management
Admins can manage users in the system:
- **List Users**: View the list of all users in the system.
- **Activate/Deactivate Users**: Toggle user activity status between Active and Not Active.

---

## 2. User Panel

### Auth Module
- Users can log in to the application and manage their own projects and tasks.

### User Profile
- **View/Edit Profile**: Users can view and update their personal profile information.

### Project List (History)
- Users can view a history of all the projects they are assigned to.

### Task List
- Users can view all tasks assigned to them, divided into three columns based on the status of the task:
  1. **To-Do**
  2. **In-Progress**
  3. **Done**

---

## Additional Features

- **Light/Dark Mode**: Toggle between light and dark themes for a customized user experience.
- **Drag and Drop**: Easily move tasks between different statuses (To-Do, In-Progress, Done) using drag-and-drop functionality.
---

## Technologies Used 

- **React**
- **Vite**
- **Axios**
- **Bootstrap**
- **React Bootstrap**
- **React Router DOM**
- **React Hook Form**
- **React Sidebar Pro**
- **React Toastify**
- **react-icons**
- **Chart.js**
- **lodash**
---

## Getting Started

### Prerequisites
- Ensure that you have the necessary dependencies and database setup.

### Installation
1. Clone the repository.
   ```bash
   git clone https://github.com/username/project-management-app.git
2. Clone the repository.
   ```bash
   npm install
3. Clone the repository.
   ```bash
   npm start
