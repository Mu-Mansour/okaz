# Application Overview

**Live App:** [https://okaz-rho.vercel.app/](https://okaz-rho.vercel.app/)

This document outlines the core features and technologies used in the **Okaz** e-commerce application.

## Core Technologies

The application is built using a modern, robust tech stack designed for performance, scalability, and developer experience.

### Framework & Language

- **[Next.js 16](https://nextjs.org/)**: React framework with App Router for server-side rendering, routing, and API handling.
- **[TypeScript](https://www.typescriptlang.org/)**: Typesafe JavaScript for better code quality and developer tooling.

### Styling & UI

- **[Tailwind CSS (v4)](https://tailwindcss.com/)**: Utility-first CSS framework for rapid UI development.
- **[shadcn/ui](https://ui.shadcn.com/)**: Reusable UI components built on **[Radix UI](https://www.radix-ui.com/)** primitives (Dialog, Select, Dropdown, etc.).
- **[Lucide React](https://lucide.dev/)**: Beautiful, consistent icons.

### Database & ORM

- **[PostgreSQL](https://www.postgresql.org/)**: Robust relational database.
- **[Prisma](https://www.prisma.io/)**: Next-generation Node.js and TypeScript ORM for database modeling and type-safe queries.
- **[Neon](https://neon.tech/)** (Optional): Serverless Postgres driver compatibility.

### Authentication & Security

- **[NextAuth.js (v5)](https://authjs.dev/)**: Complete open-source authentication solution.
- **[Bcrypt-ts](https://github.com/kelektiv/node.bcrypt.js)**: Library for hashing passwords.

### State Management & Forms

- **[React Hook Form](https://react-hook-form.com/)**: Performant, flexible, and extensible forms.
- **[Zod](https://zod.dev/)**: TypeScript-first schema declaration and validation library.

### Payments

- **[Stripe](https://stripe.com/)**: Integration for credit card processing (`@stripe/stripe-js`, `@stripe/react-stripe-js`).
- **[PayPal](https://developer.paypal.com/)**: Integration for PayPal payments (`@paypal/react-paypal-js`).

### File Storage & Media

- **[Uploadthing](https://uploadthing.com/)**: Easy file uploading for React applications.

### Email & Communication

- **[Resend](https://resend.com/)**: Email API for developers.
- **[React Email](https://react.email/)**: Build and send emails using React components.

## Key Application Features

### 🛍️ Customer Experience

- **Product Catalog**: Browse products with filtering, categorization, and search.
- **Product Details**: Detailed views including images, descriptions, ratings, and stock status.
- **Shopping Cart**: Persistent cart functionality to add, remove, and update items.
- **Checkout Flow**: Multi-step checkout process:
  1.  **Shipping Address**: Manage delivery details.
  2.  **Payment Method**: Select preferred payment option (Stripe/PayPal/Cash on Delivery).
  3.  **Place Order**: Review and confirm the order.
- **User Accounts**: Profile management, order history, and payment method settings.
- **Reviews & Ratings**: Users can leave verified reviews and ratings for products.

### 🛡️ Admin Dashboard

- **Overview**: Dashboard with key metrics and insights.
- **Product Management**: Create, read, update, and delete (CRUD) products. Features include image uploads via Uploadthing.
- **Order Management**: View and update order statuses (e.g., mark as delivered).
- **User Management**: View and modify user roles and details.

### ⚙️ Backend Features

- **Secure API**: Protected API routes for data access and manipulation.
- **Webhooks**: Handling external events (e.g., payment confirmations).
- **Database Seeding**: Tools to populate the database with initial data (`db/seed`).
