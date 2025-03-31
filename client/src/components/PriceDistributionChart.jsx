import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../styles/PriceDistributionChart.css';

const PriceDistributionChart = () => {
  // Set the default month to March
  const [month, setMonth] = useState('3'); // Default to March
  const [priceData, setPriceData] = useState([]);

  // Mapping of month names to their corresponding numbers
  const monthMap = {
    January: '1',
    February: '2',
    March: '3',
    April: '4',
    May: '5',
    June: '6',
    July: '7',
    August: '8',
    September: '9',
    October: '10',
    November: '11',
    December: '12',
  };

  useEffect(() => {
    const fetchPriceData = async () => {
      if (!month) return; // Don't fetch if no month is selected

      try {
        const response = await fetch(`http://localhost:5008/price-distribution?month=${month}`); // Pass month as query parameter
        const data = await response.json();
        console.log(data);
        const formattedData = Object.keys(data).map(range => ({
          priceRange: range,
          count: data[range]
        }));

        setPriceData(formattedData);
      } catch (error) {
        console.error('Error fetching price data:', error);
      }
    };

    fetchPriceData();
  }, [month]);

  return (
    <div className="price-chart-container">
      <h2 className="price-chart-header price-chart-title">Price Distribution</h2>
      <label htmlFor="month-select">Select Month: </label>
      <select
        id="month-select"
        value={Object.keys(monthMap).find(key => monthMap[key] === month) || ''} 
        onChange={(e) => setMonth(monthMap[e.target.value])} 
      >
        <option value="">--Select a month--</option>
        {Object.keys(monthMap).map((monthName) => (
          <option key={monthName} value={monthName}>{monthName}</option>
        ))}
      </select>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={priceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="priceRange" />
          <YAxis domain={[0, 20]} /> {/* fixed range for Y-axis */}
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceDistributionChart;
