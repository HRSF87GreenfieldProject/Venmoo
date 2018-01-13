import React from 'react';
import TransactionEntry from './TransactionEntry.jsx';

const TransactionHistory = props => (
  <div>
    Transaction History:
    {props.transactionHist.map(entry => (
      <div>
        <TransactionEntry transaction={entry} />
      </div>
    ))}
  </div>
);

export default TransactionHistory;
