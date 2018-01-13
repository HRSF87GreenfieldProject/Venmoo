import React from 'react';

import Form from './Form.jsx';
import TransactionHistory from './TransactionHistory.jsx';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.user);
    return (
      <div id="content">
        <div id="profile_pic" />
        <div id="head">
          <div id="name">
              <h1>{`Hello, ${this.props.user.name}`} </h1>
            </div>
          <br />
          <br />
          <br />
          <div className="balance">
              <h3>{`${this.props.user.balance}`}</h3>
            </div>
        </div>
        <Form
          user={this.props.user}
          renderUser={this.props.renderUser}
        />
        <div> Transaction History </div>
        <div className="scrollingTransactions">
        <TransactionHistory transactionHist={this.props.transactionHist} user={this.props.user}/>
        </div>
      </div>);
  }
}

export default ProfilePage;

{ /* <div>
  PROFILE PAGE
  <Form />
  <TransactionHistory transactionHist={this.props.transactionHist}/>
</div> */ }
