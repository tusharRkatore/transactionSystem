import React from "react";
import TransactionsPage from "../components/TransactionPage";
import StatisticsPage from "../components/StatisticsPage";
import PriceDistributionChart from "../components/PriceDistributionChart";
import CategoryDistributionChart from "../components/CategoryDistributionChart";

export default function Dashboard() {
  return (
    <div>
      <TransactionsPage />
      <StatisticsPage />
      <PriceDistributionChart />
      <CategoryDistributionChart />
    </div>
  );
}
