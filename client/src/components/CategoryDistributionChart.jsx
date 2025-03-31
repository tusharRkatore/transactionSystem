import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import '../styles/CategoryDistributionChart.css'; 

const CategoryDistributionChart = () => {
  
  const [month, setMonth] = useState('3'); // default month to March
  const [categoryData, setCategoryData] = useState([]);

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

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB'];

  useEffect(() => {
    const fetchCategoryData = async () => {
      if (!month) return; // Don't fetch if no month is selected

      try {
        const response = await fetch(`http://localhost:5008/category-distribution?month=${month}`); // Pass month as query parameter
        const data = await response.json();
        console.log(data);

        const formattedData = data.map((category) => ({
          name: `${category.category} : ${category.count} items`, 
          value: category.count,
        }));

        setCategoryData(formattedData);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchCategoryData();
  }, [month]); 

  return (
    <div className="category-chart-container">
      <h2 className="category-chart-title">Category Distribution</h2>
      <label htmlFor="month-select">Select Month: </label>
      <select
        id="month-select"
        value={Object.keys(monthMap).find((key) => monthMap[key] === month) || ''}
        onChange={(e) => setMonth(monthMap[e.target.value])} 
      >
        <option value="">--Select a month--</option>
        {Object.keys(monthMap).map((monthName) => (
          <option key={monthName} value={monthName}>
            {monthName}
          </option>
        ))}
      </select>

      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={categoryData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label={(entry) => entry.name} 
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryDistributionChart;
