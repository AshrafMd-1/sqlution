### **How Sqlution Works**

---

### **1. Application Flow**

Upon launching, Sqlution follows a structured and organized flow, ensuring efficient navigation and smooth query execution.

#### **1.1. Main Navigation Panel**
- The application uses `React Router` for navigation, rendering the `NavbarPage` component as the primary layout.
- The `<Outlet>` component dynamically loads the default page (`SqlPage`) using the `<Navigate to="/sql"/>` redirection.
- At this stage, no specific query is selected.

#### **1.2. Query Execution Workflow**
- When a query is selected, the following sequence occurs:
    - The `CodeMirror` SQL editor opens, displaying the query alongside the table visualizer.
    - Users have two execution options:
        - **Selection Execution:** If a portion of the query is highlighted, only the selected part is executed.
        - **Full Execution:** Without any selection, the entire query is executed, with the final result displayed in the table visualizer.
- The application fetches the corresponding column data and executes the query, displaying the output in a paginated table.

#### **1.3. Error Handling**
- If the query execution fails:
    - An error message with the SQL error description is displayed.
    - The application prevents rendering invalid or incomplete data.
- On successful execution:
    - The table is dynamically rendered with pagination for improved readability.
    - A loader animation is displayed while the query is being executed, providing visual feedback.

---

### **2. AI-Powered SQL Assistance**

Sqlution integrates with **Google Gemini** to provide AI-powered SQL assistance. This feature enhances productivity by generating SQL queries or providing query optimization suggestions.

#### **2.1. AI Query Generation Workflow**
- When the **"AI Assist"** button is clicked:
    - The application sends the existing SQL context to the Gemini API.
    - Gemini generates relevant SQL suggestions or alternative query structures.
    - The generated query is appended directly into the `CodeMirror` SQL editor for immediate execution or further modification.

---

### **3. Template Management**

Sqlution includes a template management feature that allows users to save and reuse frequently executed SQL snippets.

#### **3.1. Saving SQL Templates**
- When a portion of SQL code is selected and the **"Add"** button is clicked:
    - The selected SQL snippet is saved in `localStorage`.
    - Saved templates persist even after the application is closed or refreshed.

#### **3.2. Reusing SQL Templates**
- When a saved template is clicked:
    - The corresponding SQL snippet is appended to the `CodeMirror` SQL editor.
    - This feature enables quick insertion of frequently used SQL queries, enhancing efficiency.

---

### **4. Table and Data Visualization**

Sqlution offers dynamic and interactive table visualization with efficient pagination and filtering capabilities.

#### **4.1. Dynamic Table Fetching**
- When a table is requested by navigating to `/table/:name`, the application performs the following operations:
    - It loads the corresponding table data from the `public/data` folder, which contains JSON files representing table records.
    - The app filters and renders the required columns.
    - The displayed table includes:
        - Column headers.
        - Paginated rows for efficient browsing.
    - The pagination only displays a portion of the data at a time, making it responsive and preventing performance issues.

#### **4.2. Schema Metadata Display**
- When the `/schema/:name` route is accessed:
    - The application retrieves schema metadata from predefined JSON files.
    - It displays the table schema in a structured format, including:
        - Column names.
        - Data types.
        - Constraints (e.g., `PRIMARY KEY`, `NOT NULL`).
    - This feature helps users understand the table structure before running SQL queries.

---

### **5. Component and Page Structure**

Sqlution follows a modular architecture with reusable components and page-specific layouts, promoting code maintainability and scalability.

#### **5.1. Routing Configuration**
- Sqlution uses `React Router` to manage navigation between different pages.
- The route configuration includes:
```tsx
<Routes>
   <Route path="/" element={<NavbarPage/>}>
      <Route index element={<Navigate to="/sql"/>}/>
      <Route path="sql" element={<SqlPage/>}/>
      <Route path="sql/:queryId" element={<SqlPage/>}/>
      <Route path="table" element={<TablesPage/>}/>
      <Route path="table/:name" element={<TablesPage/>}/>
      <Route path="schema" element={<SchemaPage/>}/>
      <Route path="schema/:name" element={<SchemaPage/>}/>
   </Route>
</Routes>
```
- This routing structure enables navigation between:
    - SQL execution pages.
    - Table visualization pages.
    - Schema metadata pages.

#### **5.2. Page Components**
- `SqlPage`: Displays the SQL editor and result visualization.
- `TablesPage`: Renders table data dynamically with pagination.
- `SchemaPage`: Displays the table schema metadata.
- `NavbarPage`: Provides the main navigation layout with links to SQL, tables, and schema pages.

---

### **6. Reusability and Hooks**

Sqlution uses reusable custom hooks to streamline data fetching and prevent repetitive code blocks.

#### **6.1. `useFetch` Custom Hook**
- The `useFetch.ts` hook handles data fetching operations.
- It follows a standardized pattern:
    - Accepts the URL and fetch options as parameters.
    - Manages loading, error, and data states.
    - Improves code reusability by centralizing fetch logic.

#### **6.2. State Management with Zustand**
- Sqlution uses `Zustand` to manage the global state.
- The `useSidebarStore.ts` handles the sidebar's open/close state and currently selected tables, ensuring consistent behavior across components.

---

### **7. Folder and File Structure**

Sqlution follows a clean and organized folder structure for improved readability and maintainability.

#### **7.1. Public Folder**
- Contains table data in JSON format, such as:
    - `customers.json`
    - `orders.json`
    - `employees.json`
- These files represent table data used for visualization.

#### **7.2. `src` Folder**
- `components`: Contains reusable UI components, including:
    - `SqlEditor.tsx`: Renders the CodeMirror SQL editor.
    - `TableDisplayer.tsx`: Displays query results in a paginated table.
    - `Sidebar.tsx`: Renders the table and schema navigation panel.
- `hooks`:
    - Contains the `useFetch.ts` custom hook for data fetching operations.
- `pages`:
    - Includes route-specific page components:
        - `SqlPage.tsx`
        - `TablesPage.tsx`
        - `SchemaPage.tsx`
- `store`:
    - Contains `useSidebarStore.ts` for global state management with Zustand.
- `styles`:
    - Includes CSS files for individual components, ensuring modular and maintainable styling.

---

### **8. Dependencies and Tech Stack**

Sqlution is built with modern web development technologies and libraries, ensuring high performance and maintainability.

#### **8.1. Frontend Stack**
- **React + Vite**: Frontend framework with fast development and build performance.
- **TypeScript**: For static typing and improved code reliability.
- **Zustand**: Lightweight state management library.
- **CodeMirror**: SQL editor with syntax highlighting and line numbering.
- **React Router**: Client-side routing for seamless navigation.
- **React Modal and Sliding Pane**: UI interactions for table and schema visualization.
- **Google Gemini API**: AI-powered SQL assistance.

#### **8.2. Development Tools**
- **ESLint**: Linting and code quality enforcement.
- **TypeScript Compiler**: Compiles TypeScript into JavaScript.
- **Vite**: Development server and build tool.

---

### **9. Development Scripts**

The `package.json` contains essential scripts for development and production:

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview"
}
```

- `dev`: Starts the Vite development server.
- `build`: Compiles TypeScript and builds the production version.
- `lint`: Runs ESLint for code quality checks.
- `preview`: Launches the production build in preview mode.
