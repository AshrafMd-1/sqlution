import { MdOutlineTableChart } from "react-icons/md";
import "../styles/navbarPage/Sidebar.css";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { DNA } from "react-loader-spinner";

interface TablesSchema {
  tables: string[];
  count: number;
  names: string[];
}

interface Props {
  isOpen: boolean;
}

const dictionary = {
  table: "Tables",
  sql: "SQL Editor",
  schema: "Schema",
};

const Sidebar = ({ isOpen }: Props) => {
  const { data, error, loading } = useFetch<TablesSchema>("/data/tables.json");
  const location = useLocation();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const getHeaderTitle = () => {
    return (
      dictionary[location.pathname.split("/")[1] as keyof typeof dictionary] ||
      "Sidebar"
    );
  };

  return (
    <div className="sidebar">
      <h1 className="sidebar-header">{getHeaderTitle()}</h1>

      <div className="sidebar-content">
        {loading && (
          <div className="sidebar-msg-container">
            <DNA
              visible={true}
              height="60"
              width="60"
              ariaLabel="dna-loading"
            />
            <p className="sidebar-msg-text">Loading tables...</p>
          </div>
        )}

        {error && !loading && (
          <div className="sidebar-msg-container">
            <p className="sidebar-err-msg-text">⚠️ Failed to load tables</p>
          </div>
        )}

        {data && data.tables.length === 0 && !loading && (
          <div className="sidebar-msg-container">
            <p className="sidebar-msg-text">No Tables Found</p>
          </div>
        )}

        {data && data.tables.length > 0 && !loading && (
          <ul>
            {data.tables.map((table, index) => (
              <li
                key={index}
                className={
                  location.pathname.split("/")[2] === table
                    ? "sidebar-item-active"
                    : "sidebar-item-normal"
                }
                onClick={() =>
                  navigate(`/${location.pathname.split("/")[1]}/${table}`)
                }
              >
                <MdOutlineTableChart />
                <span className="sidebar-table-name">{table}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
