import NavbarPage from "./pages/NavbarPage.tsx";
import { Navigate, Route, Routes } from "react-router";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import SchemaPage from "./pages/SchemaPage.tsx";
import TablesPage from "./pages/TablesPage.tsx";

const App = () => {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<NavbarPage />}>
          <Route index element={<Navigate to="/table" />} />
          <Route path="table" element={<TablesPage />} />
          <Route path="table/:name" element={<TablesPage />} />
          <Route path="schema" element={<SchemaPage />} />
          <Route path="schema/:name" element={<SchemaPage />} />
          {/*<Route path="sql" element={<SqlPage />} />*/}
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
