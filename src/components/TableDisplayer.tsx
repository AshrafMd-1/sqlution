import React from "react";
import "./../styles/tablesPage/TableDisplayer.css";

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
}

const TableComponent: React.FC<TableProps> = ({
  tableName,
  data,
  totalRows,
  currentPage,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
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
          value={rowsPerPage === 0 ? "all" : rowsPerPage}
          onChange={(e) =>
            onRowsPerPageChange(
              e.target.value === "all" ? 0 : parseInt(e.target.value),
            )
          }
        >
          <option value="10">10</option>
          <option value="30">30</option>
          <option value="50">50</option>
          <option value="90">90</option>
          <option value="all">All</option>
        </select>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr className="table-header">
              <th className="table-header-cell">S.No</th>
              {data.length > 0 &&
                Object.keys(data[0]).map((key, index) => (
                  <th key={index} className="table-header-cell">
                    {key}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, idx) => (
              <tr key={idx} className="table-row">
                <td className="table-cell">{indexOfFirstRow + idx + 1}</td>
                {Object.values(row).map((value, idx) => (
                  <td key={idx} className="table-cell">
                    {value !== null
                      ? value.toString().length > 35
                        ? `${value.toString().slice(0, 35)}...`
                        : value.toString()
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

export default TableComponent;
