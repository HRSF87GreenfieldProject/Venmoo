import React from 'react';
import TransactionHistory from './TransactionHistory.jsx';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

  }

  // Displaying the username is propably unnecessary at the top of the profile page,
  // but we'll probably want it displayed somewhere.
  render() {
    return (
      <div>
        PROFILE PAGE
        <TransactionHistory transactionHist={this.props.transactionHist}/>
      </div>
    );
  }
}

export default ProfilePage;
