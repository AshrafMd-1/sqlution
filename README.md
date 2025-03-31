# Sqlution

## Overview
**Sqlution** is a SQL editor built with **Vite** and **TypeScript**, designed to offer an efficient SQL querying experience. It supports multi-query execution, AI integration for SQL generation, query history tracking, and local storage functionality to save and reuse SQL templates. The application provides a clear view of table metadata and actual table data with scrollable tables.

## Tech Stack
- **Framework:** Vite + TypeScript
- **Packages Used:**
    - **SQL & AI:**
        - `@codemirror/lang-sql` - SQL syntax highlighting
        - `@google/generative-ai` - AI-powered SQL generation (front-end only)
    - **UI & Components:**
        - `react-loader-spinner` - Loading animations
        - `react-icons` - Icons
        - `react-modal` - Modals
        - `react-sliding-pane` - Sliding panels
    - **Routing & State Management:**
        - `react-router` & `react-router-dom` - Navigation
        - `zustand` - State management
    - **Optimization:**
        - `terser` - Minifying JavaScript packages
    - **Environment Variables:**
        - `dotenv` - Environment configuration

## Navigation & Features
- **Routes:**
    - `/` - Redirects to `/sql` by default
    - `/sql` - SQL editor with multi-query support
    - `/sql/:queryId` - Opens a specific query
    - `/table` - Displays actual table data with scrollable tables
    - `/table/:name` - Opens a specific table view
    - `/schema` - Displays table schema metadata (rows, columns, and data types)
    - `/schema/:name` - Opens schema details for a specific table

- **SQL Editor:**
    - Multiple query pages
    - AI-powered SQL generation
    - Query history tracking
    - Template feature: Save and reuse frequently used queries

- **Additional Functionalities:**
    - Scrollable tables
    - Time display feature
    - Only the `SELECT` query functionality is implemented

## Performance
- **Lighthouse Performance Score:** 95-100%
- **Optimization Techniques:**
    - Minified packages using `terser`
    - Efficient state management with `zustand`
