import { useParams } from "react-router";
import { useEffect, useState } from "react";

import "./../styles/tablesPage/tablesPage.css";
import TableComponent from "../components/TableDisplayer.tsx";

interface TableRow {
  [key: string]: string | number | null;
}

interface TableData {
  count: number;
  data: TableRow[];
}

const TablesPage = () => {
  const { name } = useParams();
  const [data, setData] = useState<TableData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(30);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/data/${name}.json`);
        if (!response.ok) {
          throw new Error("File not found");
        }
        const jsonData = await response.json();
        setData(jsonData);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching JSON:", error);
        setError("Failed to load data.");
      }
    };

    if (name) {
      fetchData();
    }
  }, [name]);

  if (!name) {
    return <p className="info-message">Click on a table to see its data</p>;
  }

  if (error) return <p className="error-message">{error}</p>;
  if (!data) return <p className="loading-message">Loading...</p>;

  return (
    <div
      className={`
    .tables-page-container ${data.data.length === 0 ? "no-data" : ""}`}
    >
      <TableComponent
        tableName={name}
        data={data.data}
        columns={Object.keys(data.data[0] || {})}
        totalRows={data.count}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        onPageChange={setCurrentPage}
        onRowsPerPageChange={setRowsPerPage}
      />
    </div>
  );
};

export default TablesPage;
