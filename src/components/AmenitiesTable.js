// AmenitiesTable.jsx

import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import csvFile from "../assets/amenities-table-2.csv";
import csvFile2 from "../assets/amenities-table-small.csv";
import tableStyles from "./AmenitiesTable.module.css";
import debounce from "lodash/debounce";

const AmenitiesTable = () => {
  const [tableData, setTableData] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 850);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data1, data2] = await Promise.all([
          fetch(csvFile).then((response) => response.text()),
          fetch(csvFile2).then((response) => response.text()),
        ]);

        setTableData(isSmallScreen ? parseCSV(data2) : parseCSV(data1));
      } catch (error) {
        console.error("Error fetching CSV:", error.message);
      }
    };

    fetchData();
  }, [isSmallScreen]);

  useEffect(() => {
    const handleResize = debounce(() => {
      setIsSmallScreen(window.innerWidth <= 1050);
    }, 150);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const parseCSV = (data) => {
    let parsedData = [];
    Papa.parse(data, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: false,
      complete: (result) => {
        parsedData = result.data;
      },
      error: (error) => {
        console.error("CSV parsing error:", error.message);
      },
    });
    return parsedData;
  };

  return (
    <div className={tableStyles.tableContainer}>
      <table className={tableStyles.table}>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((value, columnIndex) => (
                <td
                  key={columnIndex}
                  style={{
                    fontWeight: columnIndex === 1 ? "bold" : "normal",
                    textAlign: columnIndex === 1 ? "right" : "left",
                    paddingRight: columnIndex === 1 ? "25px" : 0,
                  }}
                >
                  {value === "z" ? " " : value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AmenitiesTable;
