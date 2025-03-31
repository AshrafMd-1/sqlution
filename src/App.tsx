import NavbarPage from "./pages/NavbarPage.tsx";
import { Navigate, Route, Routes } from "react-router";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import SchemaPage from "./pages/SchemaPage.tsx";
import TablesPage from "./pages/TablesPage.tsx";
import SqlPage from "./pages/SqlPage.tsx";

const App = () => {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<NavbarPage />}>
          <Route index element={<Navigate to="/sql" />} />
          <Route path="sql" element={<SqlPage />} />
          <Route path="sql/:queryId" element={<SqlPage />} />
          <Route path="table" element={<TablesPage />} />
          <Route path="table/:name" element={<TablesPage />} />
          <Route path="schema" element={<SchemaPage />} />
          <Route path="schema/:name" element={<SchemaPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
