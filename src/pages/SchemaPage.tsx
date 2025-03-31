import {useParams} from "react-router";
import useFetch from "../hooks/useFetch";
import "./../styles/schemaPage/schemaPage.css";
import {DNA} from "react-loader-spinner";

interface TableMetadata {
  metadata: {
    count: number;
    columns: {
      name: string;
      type: string;
    }[];
  };
}

const SchemaPage = () => {
  const {name} = useParams();
  const url = name ? `/data/${name}_metadata.json` : null;
  const {data, error, loading} = useFetch<TableMetadata>(url);

  if (!name)
    return (
        <div className="schema-msg-container">
          <p>Please select a table from the left menu to view its schema.</p>
        </div>
    );
  if (loading) {
    return (
        <div className="loader-container">
          <DNA visible={true} height="120" width="120" ariaLabel="dna-loading"/>
        </div>
    );
  }

  if (!data && error) {
    return (
        <div className="schema-err-msg-container">
          <p>⚠️ {error}</p>
        </div>
    );
  }

  if (!data) {
    return (
        <div className="schema-msg-container">
          <p>No data available</p>
        </div>
    );
  }

  return (
      <div className="schema-page">
        <h1 className="schema-title">{name} Table</h1>
        <div className="schema-description-section">
          <h3 className="schema-description-title">Table Description</h3>
          <table className="schema-description-table">
            <thead>
            <tr>
              <th>Count of rows</th>
              <th>Count of columns</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{data.metadata.count}</td>
              <td>{data.metadata.columns.length}</td>
            </tr>
            </tbody>
          </table>
        </div>

        <div className="schema-columns-section">
          <h3 className="schema-columns-title">Columns</h3>
          <table className="schema-columns-table">
            <thead>
            <tr>
              <th>Column Name</th>
              <th>Data Type</th>
            </tr>
            </thead>
            <tbody>
            {data.metadata.columns.map((col, index) => (
                <tr key={index}>
                  <td>{col.name}</td>
                  <td>{col.type}</td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default SchemaPage;
