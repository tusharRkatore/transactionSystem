import React, { useState, useEffect } from "react";
import "../styles/TransactionPage.css";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(10);
  const [searchMonth, setSearchMonth] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:5008/all-transactions");
        const data = await response.json();
        console.log(data);
        setTransactions(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    if (searchMonth) {
      const filtered = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.dateOfSale);
        return transactionDate.getMonth() === parseInt(searchMonth) - 1;
      });
      setFilteredTransactions(Array.isArray(filtered) ? filtered : []);
    } else {
      setFilteredTransactions(Array.isArray(transactions) ? transactions : []);
    }
  }, [searchMonth, transactions]);
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;

  const currentTransactions = Array.isArray(filteredTransactions)
    ? filteredTransactions.slice(
        indexOfFirstTransaction,
        indexOfLastTransaction
      )
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="transactions-container">
      <h1 className="header">Product Transactions</h1>

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
          {currentTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>
                <img
                  src={transaction.image}
                  alt={transaction.title}
                  className="transaction-image"
                />
              </td>
              <td>{transaction.title}</td>
              <td>${transaction.price.toFixed(2)}</td>
              <td>{transaction.description}</td>
              <td>{transaction.sold ? "Yes" : "No"}</td>
              <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
            </tr>
          ))}
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
