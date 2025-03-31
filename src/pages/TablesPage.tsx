import {useParams} from "react-router";
import {useState} from "react";
import "../styles/tablesPage/tablesPage.css";
import TableComponent from "../components/TableDisplayer.tsx";
import {DNA} from "react-loader-spinner";
import useFetch from "../hooks/useFetch";
import useSidebarStore from "../store/useSidebarStore.ts";

interface TableRow {
  [key: string]: string | number | null;
}

interface TableData {
  count: number;
  data: TableRow[];
}

const TablesPage = () => {
  const {name} = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const {isOpen} = useSidebarStore();

  const {data, error, loading} = useFetch<TableData>(
      name ? `/data/${name}.json` : null,
  );

  if (!name) {
    return (
        <div className="tables-msg-container">
          <p>Please select a table from the left menu to view its schema.</p>
        </div>
    );
  }

  return (
      <div
          className={
              "tables-page-container " +
              (isOpen ? " .sidebar-open" : ".sidebar-closed")
          }
      >
        {loading ? (
            <div className="loader-container">
              <DNA
                  visible={true}
                  height="120"
                  width="120"
                  ariaLabel="dna-loading"
              />
            </div>
        ) : error && !data ? (
            <div className="tables-err-msg-container">
              <p>⚠️ Failed to fetch data </p>
            </div>
        ) : !data ? (
            <div className="tables-msg-container">
              <p>No data available</p>
            </div>
        ) : (
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
        )}
      </div>
  );
};

export default TablesPage;
