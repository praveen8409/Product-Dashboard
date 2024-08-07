// src/charts/CategorySalesChart.js
import React, { useRef, useMemo, useEffect } from 'react';
import './CategorySalesChart.css';
import { Chart, BarElement, CategoryScale, LinearScale, BarController } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, BarController);

function CategorySalesChart({ data }) {
  const chartRef = useRef(null);

  const chartData = useMemo(() => {
    const categories = Object.keys(data);
    const salesAmounts = categories.map(category => data[category].salesAmount);

    return {
      labels: categories,
      datasets: [
        {
          label: 'Sales Amount',
          data: salesAmounts,
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
          borderColor: 'rgba(153, 102, 255, 1)',
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
      <h2>Category Sales</h2>
      <canvas ref={chartRef} />
    </div>
  );
}

export default CategorySalesChart;
