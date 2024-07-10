import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { styled } from "@mui/system";

// Custom styling for the DataGrid container
const DataGridContainer = styled("div")({
  height: 500,
  width: "100%",
  overflow: "auto", // Adjusted overflow property
  "& .MuiDataGrid-root": {
    borderRadius: "5px", // Rounded corners for the grid
    border: "1px solid #ccc", // Light grey border
    "& .MuiDataGrid-header": {
      backgroundColor: "#f0f0f0", // Light grey header background
      borderBottom: "1px solid #ccc", // Light grey bottom border for header
    },
    "& .MuiDataGrid-row": {
      "&:nth-of-type(even)": {
        backgroundColor: "#f9f9f9", // Alternate row background color
      },
      "&:hover": {
        backgroundColor: "#f0f0f0", // Light grey background on hover
      },
    },
    "& .MuiDataGrid-cell": {
      // borderRight: "1px solid #ccc", // Light grey right border for cells
      padding: "8px", // Padding for cell content
      "&:last-child": {
        borderRight: "none", // No border on the last cell
      },
    },
    "& .MuiCheckbox-root": {
      color: "#1976d2", // Blue color for checkboxes
    },
  },
});

interface Row {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 150 },
  { field: "userId", headerName: "User ID", width: 120 },
  { field: "title", headerName: "Title", width: 250 },
  { field: "body", headerName: "Body", width: 500 },
];

const DataTable: React.FC = () => {
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setRows(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataGridContainer>
      <DataGrid rows={rows} columns={columns} checkboxSelection />
    </DataGridContainer>
  );
};

export default DataTable;
