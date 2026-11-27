# SplitMate – Full Stack Expense Sharing Application

SplitMate is a full-stack expense sharing application built to simplify group expense management. It helps users manage shared expenses, organize groups, track balances, and split expenses among friends.

## Tech Stack

### Frontend
- Angular 22
- TypeScript
- HTML
- SCSS

### Backend
- Java 17
- Spring Boot
- Spring Data JPA
- Hibernate
- Maven

### Database
- PostgreSQL

## Features

- User Registration and Login
- Interactive Dashboard
- Group Management
- Add and Manage Expenses
- Split Expenses Among Group Members
- Track Shared Expenses and Balances
- Expense Reports
- User Profile Management

## Project Structure

```text
SplitMate/
├── splitmate-frontend/
│   ├── src/
│   ├── package.json
│   └── angular.json
│
├── splitmate-backend/
│   ├── src/
│   └── pom.xml
│
├── .gitignore
└── README.md
```

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/SplitMate.git
cd SplitMate
```

### 2. Backend Setup

- Open `splitmate-backend` in IntelliJ IDEA.
- Create a PostgreSQL database named `splitmate_db`.
- Configure environment variables:

```text
DB_URL=jdbc:postgresql://localhost:5432/splitmate_db
DB_USERNAME=postgres
DB_PASSWORD=your_database_password
```

- Run `SplitmateBackendApplication.java`.

Backend URL: `http://localhost:8081`

### 3. Frontend Setup

- Open the `splitmate-frontend` folder.
- Install dependencies:

```bash
npm install
```

- Start the Angular development server:

```bash
ng serve
```

Frontend URL: `http://localhost:4200`

## Developer

Developed using Angular, Java, Spring Boot, and PostgreSQL.