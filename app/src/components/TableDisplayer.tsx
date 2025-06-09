import "../styles/tablesPage/TableDisplayer.css";
import {useEffect, useState} from "react";

interface TableRow {
  [key: string]: string | number | null;
}

interface TableProps {
  tableName: string;
  data: TableRow[];
  totalRows: number;
  currentPage: number;
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (value: number) => void;
  columns: string[];
}

const TableDisplayer = ({
                          tableName,
                          data,
                          totalRows,
                          currentPage,
                          rowsPerPage,
                          onPageChange,
                          onRowsPerPageChange,
                          columns,
                        }: TableProps) => {
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);

  useEffect(() => {
    if (data.length > 0) {
      const keys = Object.keys(data[0]);
      const lowerCaseColumns = columns.map((col) => col.toLowerCase());

      if (columns.includes("*")) {
        setVisibleColumns(keys);
      } else {
        const filteredColumns = keys.filter((key) =>
            lowerCaseColumns.includes(key.toLowerCase()),
        );
        setVisibleColumns(filteredColumns);
      }
    }
  }, [data, columns]);

  const totalPages = rowsPerPage === 0 ? 1 : Math.ceil(totalRows / rowsPerPage);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows =
      rowsPerPage === 0 ? data : data.slice(indexOfFirstRow, indexOfLastRow);

  return (
      <div className="table-container">
        <div className="table-header-controls">
          <h2 className="table-title">{tableName}</h2>
          <select
              className="rows-per-page-selector"
              value={rowsPerPage}
              onChange={(e) => onRowsPerPageChange(parseInt(e.target.value))}
          >
            <option value="10">10</option>
            <option value="30">30</option>
            <option value="50">50</option>
            <option value="90">90</option>
          </select>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
            <tr className="table-header">
              <th className="table-header-cell">S.No</th>
              {visibleColumns.map((key, index) => (
                  <th key={index} className="table-header-cell">
                    {key}
                  </th>
              ))}
            </tr>
            </thead>
            <tbody>
            {currentRows.map((row, rowIdx) => (
                <tr key={rowIdx} className="table-row">
                  <td className="table-cell">{indexOfFirstRow + rowIdx + 1}</td>
                  {visibleColumns.map((col, colIdx) => (
                      <td key={colIdx} className="table-cell">
                        {row[col] !== null
                            ? row[col]?.toString().length > 35
                                ? `${row[col]?.toString().slice(0, 35)}...`
                                : row[col]?.toString()
                            : "null"}
                      </td>
                  ))}
                </tr>
            ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button
              className="pagination-button"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
          <button
              className="pagination-button"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
  );
};

export default TableDisplayer;
