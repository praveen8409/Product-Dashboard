
//  src/charts/PieChart.js
import React, { useRef, useMemo, useEffect } from 'react';
import './PieChart.css';
import { Chart, ArcElement } from 'chart.js';

Chart.register(ArcElement);

function PieChart({ data }) {
  const chartRef = useRef(null);

  const chartData = useMemo(() => {
    const productNames = Object.keys(data);
    const salesAmounts = productNames.map(name => data[name].salesAmount);

    return {
      labels: productNames,
      datasets: [
        {
          label: 'Sales Amount',
          data: salesAmounts,
          backgroundColor: productNames.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`),
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
      <h2>Product Sales Pie Chart</h2>
      <canvas ref={chartRef} />
    </div>
  );
}

export default PieChart;
