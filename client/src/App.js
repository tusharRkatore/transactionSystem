import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard"; // NEW COMPONENT
import TransactionsPage from "./components/TransactionPage";
import StatisticsPage from "./components/StatisticsPage";
import PriceDistributionChart from "./components/PriceDistributionChart";
import CategoryDistributionChart from "./components/CategoryDistributionChart";

import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" />;
  }

  return (
    <Router>
      <Navbar />
    
      <Routes>
        {/* Dashboard Page */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
            <div className="App">
              <TransactionsPage />
              <StatisticsPage />
              <PriceDistributionChart />
              <CategoryDistributionChart />
            </div>
            </ProtectedRoute>
          }
        />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
