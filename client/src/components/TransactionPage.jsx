import React, { useState, useEffect } from "react";
import "../styles/TransactionPage.css";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(10);
  const [searchMonth, setSearchMonth] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  // -----------------------------
  // Fetch Transactions
  // -----------------------------
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("https://transactionsystem-server.onrender.com/all-transactions");
        const data = await response.json();

        console.log("BACKEND RESPONSE:", data);

        if (Array.isArray(data)) {
          setTransactions(data);
        } else {
          console.error("Backend did not return an array:", data);
          setTransactions([]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setTransactions([]);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // -----------------------------
  // Filter by Month
  // -----------------------------
  useEffect(() => {
    if (searchMonth) {
      const filtered = transactions.filter((transaction) => {
        if (!transaction.dateOfSale) return false;
        const transactionDate = new Date(transaction.dateOfSale);
        return transactionDate.getMonth() === parseInt(searchMonth) - 1;
      });
      setFilteredTransactions(filtered);
    } else {
      setFilteredTransactions(transactions);
    }
  }, [searchMonth, transactions]);

  // -----------------------------
  // Pagination Logic
  // -----------------------------
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;

  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="transactions-container">
      <h1 className="header">Product Transactions</h1>

      {/* Search by month */}
      <div className="search-container">
        <label htmlFor="month">Search by Month:</label>
        <select
          id="month"
          value={searchMonth}
          onChange={(e) => setSearchMonth(e.target.value)}
        >
          <option value="">All</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <table className="transactions-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Sold</th>
            <th>Date of Sale</th>
          </tr>
        </thead>

        <tbody>
          {currentTransactions.length === 0 ? (
            <tr>
              <td colSpan="7">No transactions found.</td>
            </tr>
          ) : (
            currentTransactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction._id}</td>

                <td>
                  <img
                    src={transaction.image}
                    alt={transaction.title}
                    className="transaction-image"
                  />
                </td>

                <td>{transaction.title}</td>

                <td>
                  $
                  {transaction.price
                    ? Number(transaction.price).toFixed(2)
                    : "0.00"}
                </td>

                <td>{transaction.description}</td>

                <td>{transaction.sold ? "Yes" : "No"}</td>

                <td>
                  {transaction.dateOfSale
                    ? new Date(transaction.dateOfSale).toLocaleDateString()
                    : "N/A"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination
        transactionsPerPage={transactionsPerPage}
        totalTransactions={filteredTransactions.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

// -----------------------------
// Pagination Component
// -----------------------------
const Pagination = ({
  transactionsPerPage,
  totalTransactions,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (
    let i = 1;
    i <= Math.ceil(totalTransactions / transactionsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination-container">
      <button
        className="prev-next"
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${number === currentPage ? "active" : ""}`}
          >
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>

      <button
        className="prev-next"
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === pageNumbers.length}
      >
        Next
      </button>
    </nav>
  );
};

export default TransactionsPage;
