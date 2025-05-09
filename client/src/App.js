import "./App.css";
import CategoryDistributionChart from "./components/CategoryDistributionChart";
import PriceDistributionChart from "./components/PriceDistributionChart";

import StatisticsPage from "./components/StatisticsPage";
import TransactionsPage from "./components/TransactionPage";

function App() {
  return (
    <div className="App">
      <TransactionsPage />
      <StatisticsPage />
      <PriceDistributionChart />
      <CategoryDistributionChart />
    </div>
  );
}

export default App;
