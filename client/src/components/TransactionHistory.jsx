import React from 'react';
import TransactionEntry from './TransactionEntry.jsx';

const TransactionHistory = props => (
  <div>
    Transaction History:
    {props.transactionHist.map(entry => {
      return <TransactionEntry transaction={entry} key={entry.transaction_id}/>
    })}
  </div>
);

export default TransactionHistory;
