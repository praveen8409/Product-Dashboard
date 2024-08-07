// src/charts/CategoryComparisonPieChart.js.js

import React, { useEffect, useRef, useMemo, useState } from 'react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { fetchSalesComparisonData } from '../services/api';
import './PieChart.css'

Chart.register(ArcElement, Tooltip, Legend);

function CategoryComparisonPieChart({ startDate, endDate }) {
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
    const categoryNames = [...new Set(data.map(item => item.category))];
    const salesAmounts = categoryNames.map(name => {
      const categoryData = data.filter(item => item.category === name);
      return categoryData.reduce((sum, item) => sum + item.salesAmount, 0);
    });

    return {
      labels: categoryNames,
      datasets: [
        {
          label: 'Sales Amount',
          data: salesAmounts,
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
          ],
        },
      ],
    };
  }, [data]);

  useEffect(() => {
    let chartInstance = null;
    if (chartRef.current) {
      chartInstance = new Chart(chartRef.current, {
        type: 'pie',
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
      <h2>Category Sales Comparison (Pie Chart)</h2>
      <canvas ref={chartRef} />
    </div>
  );
}

export default CategoryComparisonPieChart;
