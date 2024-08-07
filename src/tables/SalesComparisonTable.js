// src/tables/SalesComparisonTable.js
import React, { useMemo, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { fetchSalesComparisonData } from '../services/api';

function SalesComparisonTable({ startDate, endDate }) {
  const [data, setData] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesData = await fetchSalesComparisonData(startDate, endDate);
        setData(salesData || []); // Ensure data is always an array
      } catch (error) {
        console.error('Error fetching sales data:', error);
        setData([]); // Handle error by setting data to an empty array
      }
    };

    fetchData();
  }, [startDate, endDate]);

  const columnDefs = useMemo(() => [
    { headerName: 'Product Name', field: 'productName', sortable: true, filter: true },
    { headerName: 'Category', field: 'category', sortable: true, filter: true },
    { headerName: 'Sales Amount', field: 'salesAmount', sortable: true, filter: true },
  ], []);

  const rowData = useMemo(() => {
    return data.map(item => ({
      ...item,
    }));
  }, [data]);

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <h2>Sales Comparison Table</h2>
      <AgGridReact columnDefs={columnDefs} rowData={rowData} pagination={true} />
    </div>
  );
}

export default SalesComparisonTable;
