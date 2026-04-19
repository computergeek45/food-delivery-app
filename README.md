# Food Delivery Web Application (MERN Stack)

A full-stack Food Delivery web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) that 
allows users to browse food items, add them to cart, place orders, and enables admin to manage products and orders.

---

## Features

### User Side

* Browse food items by category
* View product details
* Add to cart / remove from cart
* Checkout with multiple payment options (COD, GPay, Card - simulated)
* Address validation (phone, pincode, etc.)
* Order placement system
* View order history

### Admin Panel

* Admin login (protected route)
* Add new products (with image URL support)
* View all products
* Delete products
* View all user orders
* Dashboard overview (total products, orders, revenue)

---

## Tech Stack

### Frontend

* React.js
* Tailwind CSS / DaisyUI
* Axios / Fetch API
* React Router DOM
* Context API (State Management)

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

---

## Installation & Setup

### 1.Clone the Repository

```bash
git clone https://github.com/your-username/food-delivery-app.git
cd food-delivery-app
```

### 2.Setup Backend

```bash
cd backend
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongodb_connection_string
```

Run backend:

```bash
npm start
or
node server.js
```

---

### 3.Setup Frontend

```bash
cd frontend
npm install
npm start
```

---

## Admin Login

```
Username: admin
Password: 123456
```

*(This is frontend-based authentication for demo purposes)*

---

## API Endpoints (Sample)

### Products

* GET `/api/products`
* POST `/api/products`
* DELETE `/api/products/:id`

### Orders

* POST `/api/orders`
* GET `/api/orders`
* GET `/api/orders/user/:id`

#mongodb collections screenshot
![App Screenshot](https://github.com/user-attachments/assets/9dc014f7-2ace-4d49-a933-076fe8866b1a) 

---

## 💡 Key Highlights

* Full-stack MERN architecture
* Clean UI with responsive design
* Real-world e-commerce flow
* Backend validation for orders
* Admin dashboard for management
* Scalable folder structure


## 🚀 Future Improvements

* Real payment gateway integration (Razorpay/Stripe)
* User authentication with JWT
* Order status tracking (Preparing, Delivered)
* Image upload (Cloudinary)
* Search & filters
