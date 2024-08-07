// import axios from 'axios';

// const API_URL = 'http://localhost:5000/productSales'; // Mock API URL

// export const fetchTodaysSalesData = async () => {
//   try {
//     const response = await axios.get(API_URL);
//     const salesData = response.data;
//     const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

//     // Filter data for the current date
//     const todaysSalesData = salesData.filter(sale => sale.salesDate === currentDate);

//     console.log("Today's Sales Data:", todaysSalesData); // Debug log
//     return todaysSalesData;
//   } catch (error) {
//     throw new Error('Failed to fetch sales data');
//   }
// };


import axios from 'axios';

const API_URL = 'https://product-json-data.onrender.com/productSales'; // Mock API URL

export const fetchSalesComparisonData = async (startDate, endDate) => {
  try {
    const response = await axios.get(API_URL);
    const salesData = response.data;

    const start = startDate.toISOString().split('T')[0];
    const end = endDate.toISOString().split('T')[0];

    const filteredData = salesData.filter(sale => {
      const saleDate = new Date(sale.salesDate).toISOString().split('T')[0];
      return saleDate >= start && saleDate <= end;
    });

    console.log('Filtered Sales Data:', filteredData); // Debug log
    return filteredData;
  } catch (error) {
    throw new Error('Failed to fetch sales data');
  }
};


export const fetchTodaysSalesData = async () => {
  try {
    const response = await axios.get(API_URL);
    const salesData = response.data;
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    // Filter data for the current date
    const todaysSalesData = salesData.filter(sale => sale.salesDate === currentDate);

    console.log("Today's Sales Data:", todaysSalesData); // Debug log
    return todaysSalesData;
  } catch (error) {
    throw new Error('Failed to fetch sales data');
  }
};
