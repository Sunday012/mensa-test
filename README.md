# Mensa Pro
## Mensa Pro is a powerful and intuitive project management application designed to help teams collaborate effectively, manage tasks, and achieve their goals. Whether you're working on a small project or managing a large team, Mensa Pro provides the tools you need to stay organized and productive.

Table of Contents

Features

Installation

Usage

Technologies

Contributing

License

Contact

Features

Mensa Pro offers a variety of features to enhance project management and team collaboration:

.Task Management: Create, assign, and track tasks with ease.

.Project Tracking: Monitor project progress with timelines and status updates.

.Team Collaboration: Facilitate communication and collaboration among team members.

.User Authentication: Secure login and user management.


## Installation
Follow these steps to install and set up Mensa Pro on your local machine.

Prerequisites
Ensure you have the following installed:

Node.js (v14 or later)

npm or yarn (for package management)

MySQL (for the database)

## Clone the Repository
bash

Copy code

git clone https://github.com/Sunday012/mensa-test

cd mensa-test

Install Dependencies

Install the required dependencies for both the frontend and backend:

bash
Copy code
# Install backend dependencies
cd backend

npm install

# Install frontend dependencies
cd ../frontend
npm install

Configure the Environment Variables

Create a .env file in the server directory and add the necessary environment variables:

bash
Copy code
# backend/.env

DATABASE_URL="YOUR_DATABASE_URL"
JWT_SECRET="YOUR_JWT_SECRET"
PORT=5000
Create a .env file in the client directory:

bash
Copy code

Set Up the Database

Set up your MySQL database and run the migrations:

bash
Copy code

# Start MySQL server (if not already running)

# Run migrations
npm run migrate

Run the Application

Start both the backend and frontend servers:

bash
Copy code

# Start the backend server
cd backend

nodemon server

# Start the frontend development server
cd ../frontend

npm run dev

The backend server will run on http://localhost:5000, and the frontend will be available at http://localhost:5173.

Usage
Once the application is running, you can:

Create an Account: Sign up with your email and start using Mensa Pro.

Manage Tasks: Add tasks, assign them to team members, and track progress.

Screenshots

Example of the project dashboard

Task management view

Technologies
Mensa Pro is built using the following technologies:

Frontend: React, TypeScript, Ant Design, Vite
Backend: Node.js, Express.js
Database: MySQL
Authentication: JSON Web Tokens (JWT)
Styling: SCSS
Contributing
We welcome contributions! Please follow these steps to contribute:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes.
Commit your changes (git commit -m 'Add new feature').
Push to the branch (git push origin feature/your-feature).
Open a pull request.
License
This project is licensed under the MIT License. See the LICENSE file for more information.

Contact
For any questions or inquiries, feel free to reach out:

Email: sundayfavour997@gmail.com
GitHub: Sunday012
 
