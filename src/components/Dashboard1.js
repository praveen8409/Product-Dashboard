// src/components/Dashboard1.js
import React, { useEffect, useState } from 'react';
import './Dashboard1.css';
import ProductSalesChart from '../charts/ProductSalesChart';
import CategorySalesChart from '../charts/CategorySalesChart';
import SalesTable from '../tables/SalesTable';
import PieChart from '../charts/PieChart';
import CategoryPieChart from '../charts/CategoryPieChart';
import { fetchTodaysSalesData } from '../services/api';

function Dashboard1() {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeChart, setActiveChart] = useState('product');

  useEffect(() => {
    fetchTodaysSalesData()
      .then((data) => {
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        const filteredData = data.filter(item => item.salesDate === today);
        setSalesData(filteredData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const aggregateSalesData = (data, key) => {
    return data.reduce((acc, item) => {
      if (!acc[item[key]]) {
        acc[item[key]] = { quantitySold: 0, salesAmount: 0 };
      }
      acc[item[key]].quantitySold += item.quantitySold;
      acc[item[key]].salesAmount += item.salesAmount;
      return acc;
    }, {});
  };

  const productSalesData = aggregateSalesData(salesData, 'productName');
  const categorySalesData = aggregateSalesData(salesData, 'category');

  const renderChart = () => {
    switch (activeChart) {
      case 'product':
        return <ProductSalesChart data={productSalesData} />;
      case 'category':
        return <CategorySalesChart data={categorySalesData} />;
      case 'pie':
        return <PieChart data={productSalesData} />;
      case 'categoryPie':
        return <CategoryPieChart data={categorySalesData} />;
      default:
        return <ProductSalesChart data={productSalesData} />;
    }
  };

  return (
    <div className="dashboard">
      <h1>Today's Sales</h1>
      <nav style={{ marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}>
        <button onClick={() => setActiveChart('product')}>Product Sales Chart</button>
        <button onClick={() => setActiveChart('category')}>Category Sales Chart</button>
        <button onClick={() => setActiveChart('pie')}>Pie Chart</button>
        <button onClick={() => setActiveChart('categoryPie')}>Category Pie Chart</button>
      </nav>
      {renderChart()}
      <SalesTable data={salesData} />
    </div>
  );
}

export default Dashboard1;
