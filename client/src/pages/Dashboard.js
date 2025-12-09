import React from "react";
import TransactionsPage from "../components/TransactionPage";
import StatisticsPage from "../components/StatisticsPage";
import PriceDistributionChart from "../components/PriceDistributionChart";
import CategoryDistributionChart from "../components/CategoryDistributionChart";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
    <div className="dashboard-grid">
      <TransactionsPage />
      <StatisticsPage />
      <PriceDistributionChart />
      <CategoryDistributionChart />
    </div>
    </div>
  );
}
