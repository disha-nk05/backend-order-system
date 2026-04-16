##BACKEND ORDER MANAGEMENT SYSTEM

##OVERVIEW:
This project implements a simple backend system for managing products and orders with stock handling, It demonstrates concepts like stock reservation, order confirmation, and automatic order expiry.

##FEATURES:
-Product creation with stock tracking
-Create orders with multiple items
-Stock reservation during order creation
-Order confirmation to finalize stock deduction
-Automatic order expiry with stock

##TECH STACK:
-Node.js
-Express.js

##SETUP INSTRUCTION:
-Clone the repository: git clone
-Navigate to project folder: cd backend-task
-Install dependencies:npm install
-Run the server: node app.js
-Server will start at: http://localhost:3000

##API DOCUMENTATION:
1.Create Product
-POST/Products
-Body:{"items":"Laptop",
       "stock":10}

2.Get Product by ID
-GET/products/:id

3.Create Order
-POST/orders
-Body:{"items":[{"productid":1,"quantity":2}]}

4.Confirm Order
-POST/orders/:id/confirm

##ORDER FLOW
1.Create product with stock
2.Create order -> stock is reserved
3.Confirm order -> stock is finalized
4.if not confirmed within 1 min time -> order expires and stock is released

##NOTES
-in-memory storage is used for simplicity
-in production, a realtional database(MySQL/PostgreSQL) should be used
-For concurrency handling, database transcations or locking mechanisms should be implemented
-For order expiry, baackground jobs or queues are recommended instead of setTimeout


##AUTHOTR
##DISHA NAIK
