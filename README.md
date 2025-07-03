# Retail Dashboard App
This is an application which you can manage an inventory of products, browse items in stock, see their details, emulate making purchases, and visualize sales data with a dashboard.  

## Features  
- Display detailed product information with images and description which data from Server-side JSON file  
- Add products to a cart stored in localStorage  
- Submit product reviews with star rating, titles, and comments  
- View all reviews for each product  
- Manage product stock quantities on purchase.json on server-side repository    
  
## ⚙️Development Team  
・Risa (GitHub: [@risa0110](https://github.com/risa0110))  

## ✅Technologies Used
-HTML5    
-CSS3  
-JavaScript  
-Git & GitHub (for version control)  

## Inspiration
This project was inspired by the existing retail web-site of [Bleu Bleuet](https://www.bleubleuet.jp/shop/default.aspx). 

## Folder Structure  
/index.html / Main page for product gallery  
/main.js / js for the main page(index.html)  
/product.html / page which shows you the detail for each items  
/product.js / js for the product.html  
/cart.html / page for puchasing the products    
/checkout.js  / js for the cart.html  
/common.js / js for the few common function like header section  
/dashboard.html / show the available items, sold quantity, average of the review score    
/dashboard.js / js for the dashboard page   
/style.css  / styling for the UI    
/README.md  
/assets  / Stores the site logo
  
## Getting Started    
### Prerequisites  
- [Node.js](https://nodejs.org/) installed on your system  
- A modern web browser (Chrome, Firefox, Edge, etc...)  
  
## 🚧 Under Development  
- **Dashboard Feature**: Visualize data on product availability, sales performance, and user reviews with interactive charts.
- **Cart Validation**: Prevent users from adding items to the cart when the stock is 0 (currently no error is thrown).
- **Review Analysis**:
  - Calculate the average score for each product based on 5-star reviews.
  - Use regular expressions to detect keywords in review comments.
  - Visualize keyword trends such as positive words ("great", "good", "excellent") and negative words ("bad", "disappoint", "broken").  
- **Review Section UI Improvements**:Enhance visual layout of user reviews with better spacing, avatar icons, timestamps, and overall readability.     
- **Product Filtering on Main Page**:Add filtering functionality by keyword, category tag, or stock availability on the main product listing page.  