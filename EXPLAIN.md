### **How Sqlution Works**

---

### **1. Application Flow**

Sqlution offers a seamless and structured workflow for SQL query execution and table visualization, ensuring smooth
navigation and efficient data handling.

#### **1.1. Main Navigation Panel**

- Sqlution uses `React Router` for client-side navigation.
- The `NavbarPage` component serves as the main layout, rendering the `<Outlet>` component.
- On launch:
    - The application redirects to the SQL page (`/sql`) using:
    ```tsx
    <Navigate to="/sql" />
    ```  
    - No query is selected by default.

#### **1.2. Query Execution Workflow**

- When a query is selected:
    - The `CodeMirror` SQL editor opens, displaying the query alongside the table visualizer.
- Execution options:
    - **Selection Execution:** Executes only the highlighted portion of the query.
    - **Last Line Execution:** Executes the final line if no selection is made.
- The results are displayed in a paginated table.

#### **1.3. Error Handling**

- On **execution failure**:
    - An error message with the SQL error description is displayed.
    - Invalid or incomplete data is prevented from rendering.
- On **successful execution**:
    - The result table is rendered with pagination for better readability.
    - A loading animation provides visual feedback during query execution.

---

### **2. AI-Powered SQL Assistance**

Sqlution integrates **Google Gemini** for AI-powered SQL generation and optimization, boosting productivity.

#### **2.1. AI Query Generation**

- When the **"AI Assist"** button is clicked:
    - The current SQL context is sent to the Gemini API.
    - Gemini generates SQL suggestions or optimized query structures.
    - The generated query is inserted into the `CodeMirror` editor for immediate use or further modification.

#### **2.2. History Persistence**

- The AI-generated SQL history is saved in `localStorage`, allowing users to revisit previous queries.

---

### **3. SQL Template Management**

Sqlution supports saving and reusing frequently executed SQL snippets.

#### **3.1. Saving SQL Templates**

- When the **"Add"** button is clicked:
    - The selected SQL snippet is saved in `localStorage`.
    - Saved templates persist even after closing or refreshing the application.

#### **3.2. Reusing SQL Templates**

- Clicking a saved template:
    - Appends the SQL snippet to the `CodeMirror` editor.
    - Enables quick insertion of commonly used queries, enhancing efficiency.

---

### **4. Table and Data Visualization**

Sqlution offers dynamic table visualization with pagination and filtering for efficient data browsing.

#### **4.1. Dynamic Table Fetching**

- When navigating to `/table/:name`:
    - The application fetches the table data from the `public/data` folder (JSON files representing table records).
    - It filters and renders the relevant columns.
- The table displays:
    - Column headers.
    - Paginated rows for smooth browsing.
- Pagination optimizes performance by loading only a portion of the data at a time.

#### **4.2. Schema Metadata Display**

- When accessing `/schema/:name`:
    - The application retrieves schema metadata from predefined JSON files.
    - Displays the table schema with:
        - Column names.
        - Data types.
- This helps users understand the table structure before running queries.

---

### **5. Component and Page Structure**

Sqlution follows a modular architecture with reusable components, promoting scalability and maintainability.

#### **5.1. Routing Configuration**

- `React Router` manages the navigation:

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

- This configuration allows navigation between:
    - SQL execution pages.
    - Table visualization pages.
    - Schema metadata pages.

#### **5.2. Page Components**

- `SqlPage`: SQL editor with result visualization.
- `TablesPage`: Displays table data with pagination.
- `SchemaPage`: Shows table schema metadata.
- `NavbarPage`: Main navigation layout with links to SQL, tables, and schema pages.

---

### **6. Reusability and Hooks**

Sqlution uses custom hooks and reusable components to simplify code and streamline data fetching.

#### **6.1. `useFetch` Custom Hook**

- Handles data fetching operations with:
    - URL and fetch options as parameters.
    - Loading, error, and data states.
- Improves reusability by centralizing fetch logic.

#### **6.2. Global State Management with Zustand**

- `Zustand` manages the global state.
- The `useSidebarStore.ts` handles:
    - Sidebar open/close state.
    - Currently selected tables.
- Ensures consistent behavior across components.

---

### **7. Folder and File Structure**

Sqlution follows a clean, modular folder structure for maintainability.

#### **7.1. Public Folder**

- Contains JSON table data, such as:
    - `customers.json`
    - `orders.json`
    - `employees.json`

#### **7.2. `src` Folder**

- `components`: Reusable UI components:
    - `SqlEditor.tsx`: CodeMirror SQL editor.
    - `TableDisplayer.tsx`: Displays query results in a paginated table.
    - `Sidebar.tsx`: Renders the navigation panel.
- `hooks`: Contains the `useFetch.ts` custom hook.
- `pages`: Route-specific page components:
    - `SqlPage.tsx`
    - `TablesPage.tsx`
    - `SchemaPage.tsx`
- `store`:
    - `useSidebarStore.ts`: Zustand store for global state.
- `styles`:
    - CSS files for individual components.

---

### **8. Tech Stack and Dependencies**

Sqlution uses modern web technologies for high performance and maintainability.

#### **8.1. Frontend Stack**

- **React + Vite:** Fast frontend development and build performance.
- **TypeScript:** Static typing for reliability.
- **Zustand:** Lightweight state management.
- **CodeMirror:** SQL editor with syntax highlighting.
- **React Router:** Client-side routing.
- **React Modal & Sliding Pane:** UI interactions.
- **Google Gemini API:** AI-powered SQL assistance.

#### **8.2. Development Tools**

- **ESLint:** Code quality checks.
- **TypeScript Compiler:** Compiles TypeScript to JavaScript.
- **Vite:** Development server and build tool.

---

### **9. Development Scripts**

The `package.json` includes essential scripts:

```json
"scripts": {
"dev": "vite",
"build": "tsc -b && vite build",
"lint": "eslint .",
"preview": "vite preview"
}
```

- `dev`: Starts the development server.
- `build`: Compiles TypeScript and creates a production build.
- `lint`: Runs ESLint for code quality checks.
- `preview`: Serves the production build.

