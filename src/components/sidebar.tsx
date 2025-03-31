import { useEffect, useState } from "react";
import { MdOutlineTableChart } from "react-icons/md";
import "../styles/navbarPage/Sidebar.css";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

interface TablesSchema {
  tables: string[];
  count: number;
}

interface Props {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: Props) => {
  const [data, setData] = useState<TablesSchema | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTablesData = async () => {
      try {
        const response = await fetch("/data/tables.json"); // Fetch from public folder
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching table.json:", error);
      }
    };

    fetchTablesData();
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="sidebar">
      <h1 className="sidebar-header">
        {location.pathname.split("/")[1].charAt(0).toUpperCase() +
          location.pathname.split("/")[1].slice(1)}
      </h1>
      <div className="sidebar-content">
        <ul>
          {data &&
            data.tables.map((table, index) => (
              <li
                key={index}
                className={
                  location.pathname.split("/")[2] === table
                    ? "sidebar-item-active"
                    : "sidebar-item-normal"
                }
                onClick={() => {
                  navigate(`/${location.pathname.split("/")[1]}/${table}`);
                }}
              >
                <MdOutlineTableChart />
                <span className="sidebar-table-name">{table}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
