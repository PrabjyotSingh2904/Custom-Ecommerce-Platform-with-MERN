# Custom E-commerce Platform (MERN Stack)

## Overview

This is a fully customizable **e-commerce platform** built using the MERN stack. It provides a seamless online shopping experience with features for product browsing, user authentication, cart management, and an admin dashboard for product management.

## Features

- **Admin Panel**:
  - Intuitive dashboard for product management.
  - Admins can add, edit, and delete products easily.

- **Frontend**:
  - Built with React.js for a responsive and interactive user interface.
  - Includes product categories for Men, Women, and Kids.
  - Features user login, signup, and cart management.

- **Backend**:
  - Developed using Node.js and Express.js.
  - Implements RESTful APIs for handling user authentication, cart functionality, and product management.

- **Database**:
  - MongoDB is used for storing user and product data.
  - Ensures secure and scalable data management.

## Tech Stack

- **Frontend**: React.js, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose)


## Installation

Clone this repository:
   ```bash
   https://github.com/PrabjyotSingh2904/Custom-Ecommerce-Platform-with-MERN.git
   ```
### Admin

1. Navigate to the `admin` directory:
    ```bash
    cd ../admin
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the Development Server:
    ```bash
    npm start
    ```

### Frontend

1. Navigate to the `frontend` directory:
    ```bash
    cd ../frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the Development Server:
    ```bash
    npm start
    ```

### Backend

1. Edit the MongoDB connection string in `index.js`:
   - Open `backend/index.js` and update the `MONGO_URI` with your MongoDB connection string.


2. Navigate to the `backend` directory:
    ```bash
    cd ../backend
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Start the Backend Server:
    ```bash
    nodemon index.js
    ```
## Open the Application in Your Browser

- Frontend: [http://localhost:3000](http://localhost:3000)
- Admin : [http://localhost:3001](http://localhost:3001)
- Backend : [http://localhost:4000](http://localhost:4000)

## Contributions

Contributions are welcome! Feel free to open an issue or submit a pull request to enhance the platform.

## License

This project is licensed under the MIT License.


