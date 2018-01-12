import React from 'react';
import TransactionEntry from './TransactionEntry.jsx';

// const TransactionHistory = (props) => {
//   return (
//     <div>
//       Transaction History:
//       {props.transactionHist.map(entry => (
//         <div>
//           <TransactionEntry
//             transaction={entry}
//             key={entry.transaction_id}
//             user={props.user}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };


const TransactionHistory = props => (
  <div className="container">
    Transaction History:
    {props.transactionHist.map(entry => {
      return <TransactionEntry 
            transaction={entry}
            key={entry.transaction_id}
            user={props.user}/>
    })}
  </div>
);

export default TransactionHistory;
