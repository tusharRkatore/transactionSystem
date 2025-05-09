import React, { useState, useEffect } from 'react';
import '../styles/StatisticsPage.css'; 

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const StatisticsPage = () => {
    const [month, setMonth] = useState(3); // Default to March
    const [statistics, setStatistics] = useState({
        totalSaleAmount: 0,
        totalSoldItems: 0,
        totalNotSoldItems: 0,
    });

    useEffect(() => {
        fetchStatistics(month);
    }, [month]);

    const fetchStatistics = async (month) => {
        try {
            const response = await fetch(`http://localhost:5008/statistics/${month}`);
            const data = await response.json();
            setStatistics(data);
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
    };

    return (
        <div className="statistics-container">
            <h2>Statistics for Month {monthNames[month-1]}</h2>
            <select value={month} onChange={(e) => setMonth(e.target.value)} className="month-dropdown">
                <option value={1}>January</option>
                <option value={2}>February</option>
                <option value={3}>March</option>
                <option value={4}>April</option>
                <option value={5}>May</option>
                <option value={6}>June</option>
                <option value={7}>July</option>
                <option value={8}>August</option>
                <option value={9}>September</option>
                <option value={10}>October</option>
                <option value={11}>November</option>
                <option value={12}>December</option>
            </select>
            <div className="statistics">
                <p>Total Sale Amount: ${statistics.totalSaleAmount}</p>
                <p>Total Sold Items: {statistics.totalSoldItems}</p>
                <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
            </div>
        </div>
    );
};

export default StatisticsPage;
