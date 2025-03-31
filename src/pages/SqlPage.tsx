import {useCallback, useEffect, useMemo, useState} from "react";
import {useLocation} from "react-router-dom";
import SqlEditor from "../components/SqlEditor.tsx";
import "../styles/sqlPage/SqlPage.css";
import TableDisplayer from "../components/TableDisplayer.tsx";
import {sqlCommands} from "../utils/sqlEditorMisc.ts";
import useFetch from "../hooks/useFetch.ts";
import {DNA} from "react-loader-spinner";
import useSidebarStore from "../store/useSidebarStore.ts";

const SqlPage = () => {
  const location = useLocation();

  const [query, setQuery] = useState<string>("");
  const [tableName, setTableName] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [commandError, setCommandError] = useState<boolean>(false);
  const {isOpen} = useSidebarStore();

  // eslint-disable-next-line
  const {data, error, loading} = useFetch<any>(
      tableName ? `/data/${tableName}.json` : null
  );

  const [columns, setColumns] = useState<string[]>([]);

  const sampleQueries: { [key: string]: string[] } = useMemo(() => ({
    "1": [
      "-- Retrieve all employees",
      "SELECT * FROM employees;",
      "-- Retrieve all orders",
      "SELECT * FROM orders;",
      "-- Retrieve all customers",
      "SELECT * FROM customers;",
      ...Array(8).fill(""),
    ],
    "2": [
      "-- Retrieve employee names and titles",
      "SELECT firstName, title FROM employees;",
      "-- Retrieve customer IDs and order dates",
      "SELECT customerID, orderDate FROM orders;",
      "-- Retrieve customer contact names and company names",
      "SELECT contactName, companyName FROM customers;",
      ...Array(8).fill(""),
    ],
    "3": [
      "-- Incorrect queries with intentional errors",
      "SELECT * FROM emp; -- Error: 'emp' table does not exist",
      "SEELCT * FROM orders; -- Typo: SEELCT instead of SELECT",
      "SELECT * FROM ; -- Error: Missing table name",
      ...Array(8).fill(""),
    ],

  }), []);

  useEffect(() => {
    const match = location.pathname.match(/\/sql\/query-(\d+)/);
    const id = match?.[1];

    if (id && sampleQueries[id]) {
      setQuery(sampleQueries[id].join("\n"));
    } else {
      setQuery("");
    }
  }, [location.pathname, sampleQueries]);

  const fetchTableData = useCallback((submittedQuery: string) => {
    const finalQuery = submittedQuery.trim();

    if (!finalQuery) {
      setTableName(null);
      setColumns([]);
      setCommandError(false);
      return;
    }

    const lastQuery = finalQuery
        .split("\n")
        .filter((line) => line.trim())
        .pop() || "";

    const {table, columns: selectedColumns} = sqlCommands(lastQuery);
    if (table) {
      setTableName(table);
      setColumns(selectedColumns);
      setCurrentPage(1);
      setCommandError(false);
    } else {
      setCommandError(true);
    }
  }, []);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

  return (
      <div
          className={
              "sql-page " + (isOpen ? "sql-sidebar-open" : "sql-sidebar-closed")
          }
      >
        {query ? (
            <>
              <SqlEditor onSubmit={fetchTableData} query={query}/>

              {loading ? (
                  <div className="loading-container">
                    <DNA
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="dna-loading"
                    />
                  </div>
              ) : (
                  (commandError || error) ? (
                      <div className="error-container">
                        <h2 className="error-title">⚠️ Failed to load table</h2>
                      </div>
                  ) : (
                      tableName ? (
                          <div className="sql-table-container">
                            <TableDisplayer
                                tableName={tableName || ""}
                                data={data?.data || []}
                                totalRows={data?.count || 0}
                                currentPage={currentPage}
                                rowsPerPage={rowsPerPage}
                                onPageChange={handlePageChange}
                                onRowsPerPageChange={handleRowsPerPageChange}
                                columns={
                                  columns.length > 0
                                      ? columns
                                      : Object.keys(data?.data?.[0] || {})
                                }
                            />
                          </div>
                      ) : (
                          <div className="no-query-message">
                            <h2 className="no-query-title">No query executed</h2>
                            <p className="no-query-description">
                              Please enter a SQL query and submit it to display the results.
                            </p>
                          </div>
                      )
                  )
              )}
            </>
        ) : (
            <div className="no-query-message-first">
              <h2 className="no-query-title">Click on a query</h2>
            </div>
        )}
      </div>
  );
};

export default SqlPage;
