import { useCallback, useEffect, useState } from "react";
import SqlEditor from "../components/SqlEditor.tsx";
import "./../styles/sqlPage/SqlPage.css";
import { sqlCommands } from "../utils/sqlEditorMisc.ts";
import TableDisplayer from "../components/TableDisplayer.tsx";

const SqlPage = () => {
  const [query, setQuery] = useState<string>("");
  const [tableData, setTableData] = useState<any[]>([]);
  const [tableName, setTableName] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [columns, setColumns] = useState<string[]>([]);

  const fetchTableData = useCallback(async () => {
    const finalQuery = query.trim();

    if (!finalQuery) {
      setTableData([]);
      setTableName(null);
      setColumns([]);
      setTotalRows(0);
      setCurrentPage(1); // ✅ Reset page on empty query
      return;
    }

    const lastQuery =
      finalQuery
        .split("\n")
        .filter((line) => line.trim())
        .pop() || "";

    const { table, columns: selectedColumns } = sqlCommands(lastQuery);

    if (table) {
      setTableName(table);
      setCurrentPage(1); // ✅ Reset page when query changes
      try {
        const response = await fetch(`/public/data/${table}.json`);
        if (!response.ok) throw new Error("Failed to fetch table data");

        const jsonData = await response.json();
        const rows = jsonData?.data || [];

        setTableData(rows);
        setTotalRows(jsonData.count || rows.length);

        setColumns(
          selectedColumns.length > 0
            ? selectedColumns
            : Object.keys(rows[0] || {}),
        );
      } catch (error) {
        console.error("Error fetching table:", error);
        setTableData([]);
        setTotalRows(0);
        setColumns([]);
      }
    }
  }, [query]); // ✅ Reset page only when query changes

  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

  return (
    <div className="sql-page">
      <SqlEditor onSubmit={setQuery} />
      <TableDisplayer
        tableName={tableName || ""}
        data={tableData}
        totalRows={totalRows}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        columns={columns}
      />
    </div>
  );
};

export default SqlPage;
