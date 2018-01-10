import React from 'react';
import TransactionEntry from './TransactionEntry.jsx';

const TransactionHistory = props => (
  <div>
    Transaction History:
    {props.transactionHist.map(entry => (
      <div>
        Entry
      </div>
    ))}
  </div>
);

export default TransactionHistory;
