// src/charts/ProductSalesChart.js
import React, { useRef, useMemo, useEffect } from 'react';
import './ProductSalesChart.css';
import { Chart, BarElement, CategoryScale, LinearScale, BarController } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, BarController);

function ProductSalesChart({ data }) {
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
      <h2>Product Sales</h2>
      <canvas ref={chartRef} />
    </div>
  );
}

export default ProductSalesChart;
