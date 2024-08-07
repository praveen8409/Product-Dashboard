//  src/charts/CategoryPieChart.js
import React, { useRef, useMemo, useEffect } from 'react';
import './PieChart.css';
import { Chart, ArcElement } from 'chart.js';

Chart.register(ArcElement);

function CategoryPieChart({ data }) {
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
          backgroundColor: categories.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`),
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
      <h2>Category Sales Pie Chart</h2>
      <canvas ref={chartRef} />
    </div>
  );
}

export default CategoryPieChart;
