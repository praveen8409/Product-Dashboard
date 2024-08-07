import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ProductComparisonBarChart from '../charts/ProductComparisonBarChart';
import CategoryComparisonBarChart from '../charts/CategoryComparisonBarChart';
import ProductComparisonPieChart from '../charts/ProductComparisonPieChart';
import CategoryComparisonPieChart from '../charts/CategoryComparisonPieChart.js';
import SalesComparisonTable from '../tables/SalesComparisonTable';
import './Dashboard1.css';

function SalesComparisonDashboard() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [view, setView] = useState('productBar'); // Default view is 'productBar'

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div>
      <h1>Sales Comparison Between Dates</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <label>Start Date:</label>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </div>
        <div>
          <label>End Date:</label>
          <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
        </div>
      </div>
      <div style={{ marginTop: '20px', marginBottom: '20px', textAlign: 'center' }} className="dashboard" >
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
