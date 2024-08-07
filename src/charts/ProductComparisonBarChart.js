// src/charts/ProductComparisonBarChart.js
import React, { useEffect, useRef, useMemo, useState } from 'react';
import { Chart, BarElement, CategoryScale, LinearScale, BarController } from 'chart.js';
import { fetchSalesComparisonData } from '../services/api';
import './ProductSalesChart.css';

Chart.register(BarElement, CategoryScale, LinearScale, BarController);

function ProductComparisonBarChart({ startDate, endDate }) {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesData = await fetchSalesComparisonData(startDate, endDate);
        setData(salesData || []);
      } catch (error) {
        console.error('Error fetching sales data:', error);
        setData([]);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  const chartData = useMemo(() => {
    const productNames = [...new Set(data.map(item => item.productName))];
    const salesAmounts = productNames.map(name => {
      const productData = data.filter(item => item.productName === name);
      return productData.reduce((sum, item) => sum + item.salesAmount, 0);
    });

    return {
      labels: productNames,
      datasets: [
        {
          label: 'Sales Amount',
          data: salesAmounts,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  }, [data]);

  useEffect(() => {
    let chartInstance = null;
    if (chartRef.current) {
      chartInstance = new Chart(chartRef.current, {
        type: 'bar',
        data: chartData,
      });
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [chartData]);

  return (
    <div className="chart-container">
      <h2>Product Sales Comparison (Bar Chart)</h2>
      <canvas ref={chartRef} />
    </div>
  );
}

export default ProductComparisonBarChart;
