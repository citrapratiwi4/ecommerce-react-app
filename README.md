# 🌟 Élanora - Premium Fashion E-Commerce

> A sophisticated, responsive e-commerce web application built with modern React. Developed as the Final Project for the Web Development Pathway, focusing on seamless UI/UX and high-performance architecture.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-success?style=for-the-badge&logo=vercel)](https://fashion-store-xi-seven.vercel.app/)

## 📖 Project Overview

Élanora is a modern fashion storefront designed with "Timeless Elegance" in mind. This project demonstrates a complete frontend e-commerce flow, featuring a component-based architecture, dynamic routing, and a mobile-first responsive design. It is optimized for both desktop and mobile devices, ensuring a premium shopping experience across all screen sizes.

## 🚀 Key Features

### 🛍️ Core Functionality
- **Dynamic Product Catalog:** Filterable and sortable product listings by category (Dress, Skirt, Blazer, Footwear).
- **Comprehensive Product Details:** In-depth product pages featuring size guides, variant selections, and accordion-based descriptions.
- **State Management:** Seamless Add-to-Cart and Wishlist functionality across the application.
- **Interactive Promo Code System:** Integrated discount voucher system allowing users to apply promo codes (e.g., 'ELANORA20') for real-time price deductions during checkout.
- **Interactive Cart Drawer:** Real-time cart calculation and checkout simulation.

### ✨ UI/UX Highlights
- **Mobile-First Responsive Design:** Fluid layouts using Tailwind CSS Grid and Flexbox.
- **Auto-Slide Touch Gallery:** Custom-built, swipeable product image gallery with auto-play functionality for mobile users.
- **Premium Animations:** Smooth transitions, hover effects, and modal popups.
- **Scroll-to-View Navigation:** Enhanced user journey with smooth anchor scrolling.

## 🛠 Tech Stack

- **Framework:** React 19
- **Routing:** React Router DOM 7
- **Styling:** Tailwind CSS 4
- **Build Tool:** Vite 7
- **Deployment:** Vercel

## 📂 Project Structure

A clean and organized file structure for scalability and maintainability:

```text
src/
├── assets/        # Static files (images, global CSS)
├── components/    # Reusable UI components (Navbar, CartDrawer)
├── context/       # React Context API for global state management
├── data/          # Local JSON/JS data (Product database)
├── pages/         # Route components (Home, ProductDetail, Category)
└── App.jsx        # Main application router and state provider