import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ProductComparisonBarChart from '../charts/ProductComparisonBarChart';
import CategoryComparisonBarChart from '../charts/CategoryComparisonBarChart';
import ProductComparisonPieChart from '../charts/ProductComparisonPieChart';
import CategoryComparisonPieChart from '../charts/CategoryComparisonPieChart';
import SalesComparisonTable from '../tables/SalesComparisonTable';
import './SalesComparisonDashboard.css';


function SalesComparisonDashboard() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [view, setView] = useState('productBar'); // Default view is 'productBar'

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div className="dashboard-container">
      <h1>Sales Comparison Between Dates</h1>
      <div style={{ display: "flex" }}>
        <div style={{ marginBottom: '10px', padding:"10px" }}>
          <label>Start Date:</label>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </div>
        <div style={{ marginBottom: '10px' ,padding:"10px" }}>
          <label>End Date:</label>
          <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
        </div>
      </div>
      <div className="dashboard-buttons">
        <button onClick={() => handleViewChange('productBar')}>Product Bar Chart</button>
        <button onClick={() => handleViewChange('productPie')}>Product Pie Chart</button>
        <button onClick={() => handleViewChange('categoryBar')}>Category Bar Chart</button>
        <button onClick={() => handleViewChange('categoryPie')}>Category Pie Chart</button>
      </div>
      {view === 'productBar' && <ProductComparisonBarChart startDate={startDate} endDate={endDate} />}
      {view === 'productPie' && <ProductComparisonPieChart startDate={startDate} endDate={endDate} />}
      {view === 'categoryBar' && <CategoryComparisonBarChart startDate={startDate} endDate={endDate} />}
      {view === 'categoryPie' && <CategoryComparisonPieChart startDate={startDate} endDate={endDate} />}
      <SalesComparisonTable startDate={startDate} endDate={endDate} />
    </div>
  );
}

export default SalesComparisonDashboard;
