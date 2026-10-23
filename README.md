# 🛒 Kenya Product Catalogue — Pagination & Infinite Scroll

A full-stack product listing application demonstrating **server-side pagination, React pagination controls, infinite scrolling, searching, filtering, and sorting** using Node.js, Express, Prisma ORM, PostgreSQL, and React.

---

##  Project Overview

The **Kenya Product Catalogue** is a full-stack web application designed to demonstrate efficient retrieval and presentation of large datasets through pagination.

The application provides two different approaches to displaying products:

1. **Traditional Pagination:** Users navigate through products using Previous, Next, and numbered page buttons.
2. **Infinite Scroll:** Additional products are automatically loaded when users scroll toward the bottom of the page.

The backend uses **Express.js, Prisma ORM, and PostgreSQL** to handle server-side pagination, while the frontend uses **React.js** to display products dynamically.

The database contains **50 products across five categories**, with prices displayed in Kenyan Shillings (KES).

This project also implements optional search, sorting, and category filtering functionality.

##  Project Objectives

The main objectives of this assignment are to:

- Understand and implement server-side pagination using Prisma ORM.
- Build a RESTful API that supports pagination query parameters.
- Apply Prisma's `skip` and `take` methods to retrieve specific records.
- Use `Promise.all()` to execute database queries concurrently.
- Return pagination metadata, including total records, total pages, and navigation status.
- Develop reusable React components for displaying paginated data.
- Implement Previous, Next, and numbered pagination buttons.
- Understand React state management and data fetching using `useState` and `useEffect`.
- Implement infinite scrolling using the Intersection Observer API.
- Prevent duplicate API requests during infinite scrolling.
- Implement server-side product search, category filtering, and sorting.
- Build a clean, responsive user interface.
- Strengthen full-stack application development and API integration skills.

---

##  Technologies Used

### Frontend

| Technology | Purpose |
|---|---|
| React.js | Building the interactive user interface |
| Vite | Frontend development and build tool |
| React Router | Navigation between pagination and infinite scroll pages |
| JavaScript (ES6+) | Frontend functionality and state management |
| CSS3 | Styling and responsive design |
| Fetch API | Sending HTTP requests to the backend |
| Intersection Observer API | Detecting when additional products should load |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime environment |
| Express.js | Building REST API endpoints |
| Prisma ORM v6 | Database queries and pagination |
| PostgreSQL | Relational database for storing products |
| CORS | Handling cross-origin requests |
| dotenv | Managing environment variables |
| Nodemon | Automatically restarting the development server |

### Development Tools

- Visual Studio Code
- Git and GitHub
- Postman, Thunder Client, or curl
- Prisma Studio


---

## Key Features

###  Server-Side Pagination

The backend provides a `GET /api/products` endpoint that supports pagination.

**Example request:**

```http
GET /api/products?page=2&limit=10
```

The API:

- Accepts page and limit query parameters.
- Defaults to page 1 and 10 products per page.
- Validates that the page is at least 1.
- Restricts the limit to between 1 and 100.
- Calculates the number of records to skip.
- Returns paginated products and metadata.
- Returns an empty array when a page exceeds the available records.

###  React Pagination Controls

The frontend provides an interactive navigation system featuring:

- Previous and Next buttons.
- Up to five numbered page buttons.
- Highlighting of the currently selected page.
- Disabled navigation buttons at the first and last pages.
- Pagination information displaying the current page and total products.
- Loading indicators while fetching products.

###  Infinite Scrolling

The application provides an alternative product listing page using infinite scrolling.

Features include:

- Automatically fetching the first page on component mount.
- Detecting when the user reaches the bottom using `IntersectionObserver`.
- Loading subsequent pages automatically.
- Appending new products without replacing previously loaded items.
- Preventing overlapping API requests.
- Displaying loading indicators.
- Displaying **"You have reached the end."** after the last page.

###  Search, Filtering, and Sorting

The application includes additional functionality:

**Search:** Filter products by name.

**Category filtering:** Display products belonging to a selected category.

**Sorting options:**

- Newest first
- Oldest first
- Price: Low to High
- Price: High to Low
- Name: A–Z

Changing a search, filter, or sorting option resets pagination to page 1.

###  Responsive User Interface

The application features:

- Responsive product cards.
- Mobile-friendly navigation.
- Clean product grid layout.
- Formatted Kenyan Shilling prices.
- User-friendly loading, error, and empty states.

---

## Project Folder Structure

```text
week-8-day-2-assignment/
│
├── server/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   │
│   ├── src/
│   │   ├── lib/
│   │   │   └── prisma.js
│   │   │
│   │   ├── controllers/
│   │   │   └── productController.js
│   │   │
│   │   └── routes/
│   │       └── productRoutes.js
│   │
│   ├── .env
│   ├── index.js
│   └── package.json
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   │   └── products.js
│   │   │
│   │   ├── components/
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductGrid.jsx
│   │   │   ├── Pagination.jsx
│   │   │   └── ProductFilters.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── ProductsPage.jsx
│   │   │   └── InfiniteScrollPage.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── vite.config.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## Database Design

The application uses PostgreSQL with Prisma ORM.

### Product Model

```prisma
model Product {
  id          Int      @id @default(autoincrement())
  name        String
  price       Int
  category    String
  description String
  createdAt   DateTime @default(now())

  @@index([category])
  @@index([createdAt])
}
```

### Product Categories

The database contains 50 products distributed across five Kenyan retail categories.

| Category | Products |
|---|---:|
| Beverages | 10 |
| Grains | 10 |
| Dairy | 10 |
| Electronics | 10 |
| Clothing | 10 |
| **Total** | **50** |

Each product contains an ID, name, price in KES, category, description, and creation timestamp.

---

## Installation and Setup

### Prerequisites

Before running the application, install:

- Node.js and npm
- PostgreSQL
- Git
- Visual Studio Code


###  Open the Application

**Traditional Pagination:**

http://localhost:5173/products

**Infinite Scroll:**

http://localhost:5173/products/scroll

Both the backend and frontend servers must be running.

---

##  API Documentation

### Base URL

```text
http://localhost:5002/api
```

### Available Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/products` | Retrieve paginated products |
| GET | `/products?page=2&limit=10` | Retrieve page 2 with 10 products |
| GET | `/products?category=Dairy` | Filter products by category |
| GET | `/products?search=tea` | Search products by name |
| GET | `/products?sort=price&order=asc` | Sort products by ascending price |
| GET | `/products/categories` | Retrieve distinct categories |


### Query Parameters

| Parameter | Default | Description |
|---|---|---|
| `page` | 1 | Requested page number |
| `limit` | 10 | Maximum products per page |
| `search` | Empty | Product name search |
| `category` | Empty | Filter by category |
| `sort` | `createdAt` | Field used for sorting |
| `order` | `desc` | Ascending or descending order |

---

##  Understanding Pagination

Pagination divides a large dataset into smaller, manageable sections.

Instead of retrieving all 50 products simultaneously, the backend returns only the requested records.

### Pagination Formula

```javascript
const skip = (page - 1) * limit;
```

For example:

```javascript
const page = 3;
const limit = 10;

const skip = (page - 1) * limit;

// Result: skip = 20
```

The database skips the first 20 records and retrieves the next 10 products.

### Prisma Pagination Query

```javascript
const [products, total] = await Promise.all([
  prisma.product.findMany({
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  }),

  prisma.product.count(),
]);
```

### Why Use `Promise.all()`?

`Promise.all()` allows the application to execute both database queries concurrently.

One query retrieves the paginated products, while the other calculates the total number of records.

This can improve response time compared with executing two independent queries sequentially.

### Pagination Metadata

```javascript
const totalPages = Math.ceil(total / limit);

const hasNext = page < totalPages;

const hasPrev = page > 1 && totalPages > 0;
```

This metadata helps React determine which pagination buttons should be enabled or disabled.

---

##  How Infinite Scroll Works

Infinite scrolling automatically retrieves additional records when the user approaches the bottom of a page.

The application uses the browser's `IntersectionObserver` API to monitor a sentinel element positioned at the bottom of the product list.

### Workflow

1. React fetches the first 10 products.
2. The products are displayed in a responsive grid.
3. The user scrolls toward the bottom.
4. `IntersectionObserver` detects the sentinel element.
5. React requests the next page.
6. The newly retrieved products are appended to the existing list.
7. The process repeats while `hasNext` is true.
8. The application displays **"You have reached the end."** when all products have loaded.

--- 
##  Testing

Testing was planned to validate the API and frontend behaviour.

### Backend API Testing

Use curl, Postman, or Thunder Client.

---

##  Live Application and Repository

### Live Application

**Frontend:** (https://vercel.com)

**Backend API:** (https://railway.com)


---

## 📚 15. Learning Outcomes

Through this project, I strengthened my understanding of:

- Implementing efficient server-side pagination.
- Designing REST APIs with query parameters.
- Using Prisma ORM for database operations.
- Handling asynchronous requests using `Promise.all()`.
- Returning structured JSON responses with pagination metadata.
- Building reusable React components.
- Managing React state and side effects.
- Implementing traditional pagination controls.
- Using the Intersection Observer API for infinite scrolling.
- Handling loading, error, and empty states.
- Combining server-side filtering and sorting with pagination.
- Structuring a full-stack application using maintainable code.
- Testing and debugging frontend-backend integrations.








---

##  Author

**Dominic Kores Kisioya**

**Full-Stack Software & AI Engineer**

