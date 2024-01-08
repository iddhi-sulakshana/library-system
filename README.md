# Library Management System

The Library Management System is a comprehensive application developed using Vite, React, Express, Node.js, and MongoDB. This system aims to automate various processes within a library, providing functionalities such as borrowing books, reserving study rooms, viewing and searching the book collection, and accessing detailed information about each book.

Docker Hub Link : https://hub.docker.com/r/iddhi/library-system

## Technologies Used

-   **Vite:** A fast, opinionated web development build tool that serves as the frontend framework for this application.
-   **React:** A widely-used JavaScript library for building user interfaces.
-   **Express:** A web application framework for Node.js, used to create the backend server.
-   **Node.js:** A JavaScript runtime that enables server-side development.
-   **MongoDB:** A NoSQL database used to store and manage the library's data efficiently.

## Getting Started

To set up the Library Management System locally, follow these steps:

Clone the repository into your local machine

---

1. Run the following command to build the image from the current codebase cloned:

```bash
docker-compose -f ./docker-compose.build.yaml build
```

2. After building the image, run the following command to start the application:

```bash
docker-compose up
```

---

1. Without building the image directly running docker compose up command to pull the images from the `Docker Hub`

```bash
docker-compose up
```

---

-   The frontend will be accessible at http://localhost:5000
-   The backend will be accessible at http://localhost:3000
-   Database will run on the port `27017`.

---

For development purpose run these commands in bash.
`To run without docker you should have local instance or mongodb cloud url for connecting`

1. To install all dependancies and run the backend server

```bash
npm install
PORT=3001 npm start
```

2. To install all dependancies and run the frontend

```bash
npm install
PORT=8080 VITE_PORT=http://localhost:3001 npm start
```

-   The frontend will be accessible at http://localhost:8080
-   The backend will be accessible at http://localhost:3001

---

Login Creadinitals for the frontend

-   Admin section / Staff Signin
    -   email: admin@email.com
    -   password: `admin`
-   User Section
    -   email: asd1@asd.com
    -   password: `asdasd`

## Development Team

This project was a collaborative effort, with six developers contributing to its successful completion. Each team member played a crucial role in different aspects of the development process, ensuring a well-rounded and feature-rich Library Management System.

## CI/CD Integration

The project is equipped with Docker and utilizes Docker Hub for containerization. GitHub Actions have been implemented for continuous integration and continuous deployment (CI/CD), ensuring a smooth and automated workflow for development, testing, and deployment processes.

## Contribution Guidelines

If you wish to contribute to the project, please follow the guidelines outlined in the project's contribution documentation. Contributions are welcome and appreciated.

Feel free to explore the documentation for more in-depth information about installation, usage, and contribution guidelines. Happy coding!
