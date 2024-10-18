import React, { useState, useEffect } from 'react';
import { getTransactions } from '../api';

const TransactionsTable = ({ month }) => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  
  useEffect(() => {
    const fetchTransactions = async () => {
      const { data } = await getTransactions(month, search, page);
      setTransactions(data.transactions);
      setTotal(data.total);
    };

    fetchTransactions();
  }, [month, search, page]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search transactions"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Date of Sale</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn._id}>
              <td>{txn.title}</td>
              <td>{txn.description}</td>
              <td>{txn.price}</td>
              <td>{new Date(txn.dateOfSale).toLocaleDateString()}</td>
              <td>{txn.sold ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)} disabled={page * 10 >= total}>
        Next
      </button>
    </div>
  );
};

export default TransactionsTable;
