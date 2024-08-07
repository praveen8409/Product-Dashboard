// src/tables/SalesTable.js
import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { fetchTodaysSalesData } from '../services/api';

function SalesTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesData = await fetchTodaysSalesData();
        setData(salesData);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchData();
  }, []);

  const columnDefs = [
    { headerName: 'Product Name', field: 'productName', sortable: true, filter: true },
    { headerName: 'Category', field: 'category', sortable: true, filter: true },
    { headerName: 'Quantity Sold', field: 'quantitySold', sortable: true, filter: true },
    { headerName: 'Sales Amount', field: 'salesAmount', sortable: true, filter: true },
  ];

  const defaultPageSize = 10; // Ensure this value is in paginationPageSizeSelector
  const pageSizeOptions = [10, 20, 50, 100];

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <AgGridReact
        rowData={data}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={defaultPageSize}
        paginationPageSizeSelector={pageSizeOptions} // This line is incorrect, remove it
        paginationAutoPageSize={false}
      />
    </div>
  );
}

export default SalesTable;
