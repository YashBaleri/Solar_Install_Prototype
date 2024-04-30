# Solar Management Application Demo

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have Node.js installed on your machine. If you do not have Node.js installed, download and install it from [Node.js official website](https://nodejs.org/).

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies**

   Navigate to the project directory and run:

   ```bash
   npm install
   ```

3. **Start the application**

   To start the application, run:

   ```bash
   npm start
   ```

4. **Accessing the Application**

   Open your web browser and go to [http://localhost:3000](http://localhost:3000) to view the application.

## User Roles and Authentication

The application supports three types of logins:

- **Construction Team**: Access project management tools specific to construction.
- **Sales Team**: Manage sales-related tasks and customer interactions.
- **User**: General user access for clients to track the progress of their installations.

### Admin Credentials

To manage construction and sales team profiles, log in with the admin credentials:

- **Email**: admin123@gmail.com
- **Password**: Asdf\*123
- **Admin Login Page**: [Admin Login](http://localhost:3000/admin/login)

### Construction Team Login

- **Page**: [Construction Team Login](http://localhost:3000/employee/construction/login)

### Sales Team Login

- **Page**: [Sales Team Login](http://localhost:3000/employee/sales/login)

## Security Notice

Please ensure to change the admin credentials before deploying this application in a production environment to safeguard the application.
