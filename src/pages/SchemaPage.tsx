import { useParams } from "react-router";
import { useEffect, useState } from "react";
import "./../styles/schemaPage/schemaPage.css";

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
  const { name } = useParams();
  const [data, setData] = useState<TableMetadata | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/data/${name}_metadata.json`);
        if (!response.ok) {
          throw new Error("File not found");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching JSON:", error);
        setError("Failed to load data.");
      }
    };

    if (name) {
      fetchData();
    }
  }, [name]);

  if (name === undefined) {
    return <p>Click on a table to see its schema</p>;
  }

  if (error) return <p>{error}</p>;
  if (!data) return <p>Loading...</p>;

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
            {data?.metadata.columns.map((col, index) => (
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
