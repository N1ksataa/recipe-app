# Recipe Sharing Application

## Overview
This is a web-based application for sharing recipes among users. The application features a robust frontend built with Angular and a backend REST API implemented using Express.js and Node.js, connected to a MongoDB database for data persistence.

## Technologies Used
- **Frontend:** Angular
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Styling:** CSS
- **Package Manager:** npm

## Features
### Guest Users
- Can access the Home Page, Catalog, and Search functionalities.
- Can register and log in to the application.

### Registered Users
- Create, edit, and delete their own recipes.
- View and like recipes created by other users.
- Edit their profile information, including the option to change their password.

### Recipe Management
- Add a new recipe with details such as title, category, and image.
- Edit or delete recipes owned by the user.
- Like recipes shared by other users.

### Account and Form Validation
- All forms (registration, login, and recipe creation) are validated to ensure data integrity.
- **Username and email uniqueness:** The application enforces uniqueness for both the username and email during registration. Users cannot register with an existing username or email.
- **Changing username or email:**  If a logged-in user attempts to change their username or email to one that already exists in the database, the change will not be allowed, and the user will receive an appropriate error message.

## Application Pages
- **Login/Register:** Accessible to guest users only.
- **Home Page:** Accessible by everyone (both guest and logged-in users).
- **Catalog:** Displays all recipes. //Accessible by everyone (both guest and logged-in users)//
- **Search:** Allows users to search for recipes. //Accessible by everyone (both guest and logged-in users).//
- **Create Recipe:** Allows registered users to add a new recipe. // Accessible by registered (logged-in) users only. //
- **My Recipes:** Displays recipes created by the logged-in user. // Accessible by the logged-in user only. //
- **Profile:** Displays and allows editing of user details. // Accessible by the logged-in user only //
- **Current Recipe:** Displays the details of a specific recipe. 
  - **Guest Users:** Can view recipe details.
  - **Logged-in Users (Not Recipe Owner):** Can view and like the recipe.
  - **Recipe Owners:** Can view, edit, or delete the recipe.
- **Edit Recipe:** Allows recipe owners to modify their recipes. // Accessible by the recipe owner only. //

## Guards
- **authGuard:** Restricts access to certain pages (e.g., Create Recipe, My Recipes, Profile) for guest users.
- **noAuthGuard:** Prevents logged-in users from accessing Login and Register pages.

## Project Structure
- The project is organized into folders by components for maintainability. For example:
  - `core` folder contains reusable components like `header`, `footer`, and `background`.
  - Each feature has its own folder with related components, services, and styles.

## How to Run the Application
### Prerequisites
- Node.js and npm installed.
- MongoDB server running locally or in the cloud.

### Steps
1. Clone the repository from GitHub and extract it.
2. Open the project in Visual Studio Code.
3. In the terminal, navigate to the project root and install dependencies:
   ```bash
   npm i
   ```
4. Start the Angular frontend:
   ```bash
   cd src/app
   ng serve
   ```
5. Open a new terminal and start the backend server:
   ```bash
   cd rest-api/server
   npm start
   ```
6. Ensure that the MongoDB instance is running. The application will use it to store user and recipe data.
