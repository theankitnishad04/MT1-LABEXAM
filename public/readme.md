# Shopping Cart Management Web Application

## Full Stack Development – MT1 Lab Examination

A Shopping Cart Management Web Application developed using Node.js and Express.js. This project demonstrates HTTP server creation, routing, file handling, REST APIs and CRUD operations.

## Technologies Used

* Node.js
* Express.js
* JavaScript (ES6)
* HTTP Module
* FS Module
* EcoAPI
* Git and GitHub

## Project Structure

```text
MT1-LABEXAM/
│
├── package.json
├── package-lock.json
├── httpServer.js
├── expressApp.js
│
├── public/
│   └── index.html
│
└── screenshots/
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/theankitnishad04/MT1-LABEXAM.git
```

2. Open the project folder:

```bash
cd MT1-LABEXAM
```

3. Install dependencies:

```bash
npm install
```

## Part A: HTTP Server

Built using Node.js HTTP and FS modules without Express.js.

### Start Server

```bash
node httpServer.js
```

Server URL:

`http://localhost:3000`

### Available Routes

| Method | Endpoint     | Function                   |
| ------ | ------------ | -------------------------- |
| GET    | /            | Welcome Message            |
| GET    | /cart        | Display Cart Items         |
| GET    | /about       | Application Information    |
| GET    | /home        | Serve HTML using FS Module |
| POST   | /add-to-cart | Add New Product            |

## Part B: Express REST API

Built using Express.js with an in-memory JavaScript array.

### Start Server

```bash
node expressApp.js
```

Server URL:

`http://localhost:4000`

### CRUD API Endpoints

| Method | Endpoint  | Function          |
| ------ | --------- | ----------------- |
| GET    | /cart     | Get All Products  |
| GET    | /cart/:id | Get Product By ID |
| POST   | /cart     | Add New Product   |
| PUT    | /cart/:id | Update Product    |
| DELETE | /cart/:id | Delete Product    |

## Sample Product

```json
{
    "id": 1,
    "productName": "Wireless Mouse",
    "price": 799,
    "quantity": 2,
    "category": "Electronics"
}
```

## Features

* HTTP Server Creation
* URL Routing
* GET and POST Methods
* Static HTML File Serving using FS Module
* Express.js REST API
* Complete CRUD Operations
* JSON Request and Response Handling
* Route Parameters
* Input Validation
* Error Handling
* HTTP Status Codes
* Total Price Calculation (Price × Quantity)

## API Testing

All REST API endpoints can be tested using EcoAPI.

Supported operations:

* GET
* POST
* PUT
* DELETE

## Database

No external database is used. All shopping cart records are maintained in a JavaScript array.

## GitHub Repository

https://github.com/theankitnishad04/MT1-LABEXAM

## Author

Ankit Nishad

Full Stack Development – MT1 Lab Examination
