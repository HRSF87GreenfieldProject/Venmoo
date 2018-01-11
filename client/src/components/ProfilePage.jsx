import React from 'react';

import Form from './Form.jsx'
import TransactionHistory from './TransactionHistory.jsx';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        PROFILE PAGE
        <Form />
        <TransactionHistory transactionHist={this.props.transactionHist}/>
      </div>
    );
  }
}

export default ProfilePage;
