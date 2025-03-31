import { MdOutlineTableChart } from "react-icons/md";
import { PiFileSqlDuotone } from "react-icons/pi";
import "../styles/navbarPage/Sidebar.css";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { DNA } from "react-loader-spinner";

interface TablesSchema {
  tables: string[];
  count: number;
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
  const location = useLocation();
  const navigate = useNavigate();
  const isSqlRoute = location.pathname.startsWith("/sql");

  const { data, error, loading } = useFetch<TablesSchema>(
      isSqlRoute ? null : "/data/tables.json"
  );

  if (!isOpen) return null;

  const getHeaderTitle = () => {
    return (
        dictionary[location.pathname.split("/")[1] as keyof typeof dictionary] ||
        "Sidebar"
    );
  };

  const queries = ["query-1", "query-2", "query-3"];

  const displayData = isSqlRoute ? queries : data?.tables || [];

  const isActiveTab = (item: string) => {
    const currentPath = location.pathname.split("/").slice(1).join("/");
    return currentPath.includes(item.toLowerCase());
  };

  return (
      <div className="sidebar">
        <h1 className="sidebar-header">{getHeaderTitle()}</h1>

        <div className="sidebar-content">
          {loading && !isSqlRoute && (
              <div className="sidebar-msg-container">
                <DNA visible={true} height="60" width="60" ariaLabel="dna-loading" />
              </div>
          )}

          {error && !loading && !isSqlRoute && (
              <div className="sidebar-msg-container">
                <p className="sidebar-err-msg-text">⚠️ Failed to load data</p>
              </div>
          )}

          {displayData.length === 0 && !loading && (
              <div className="sidebar-msg-container">
                <p className="sidebar-msg-text">No Data Found</p>
              </div>
          )}

          {displayData.length > 0 && (
              <ul>
                {displayData.map((item, index) => (
                    <li
                        key={index}
                        className={isActiveTab(item) ? "sidebar-item-active" : "sidebar-item-normal"}
                        onClick={() => navigate(`/${location.pathname.split("/")[1]}/${item}`)}
                    >
                      {isSqlRoute ? <PiFileSqlDuotone /> : <MdOutlineTableChart />}
                      <span className="sidebar-table-name">{item}</span>
                    </li>
                ))}
              </ul>
          )}
        </div>
      </div>
  );
};

export default Sidebar;
