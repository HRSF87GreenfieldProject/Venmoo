import React from 'react';
import { Collapse, Button } from 'reactstrap';
import Form from './Form.jsx';
import TransactionHistory from './TransactionHistory.jsx';
import PendingTransactions from './PendingTransactions.jsx';
import { capitalize, insertBreaks } from './../helpers.jsx';


class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.dropdown = this.dropdown.bind(this);
    this.state = {
      collapse: false,
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  dropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  render() {
    const { user, transactionHist, renderUser} = this.props;
    const styles = {
      'padding-top': '10px',
      'padding-bottom': '5px',
      color: 'whitesmoke',
      background: '#333',
    }
    const space = {
      'margin-top': '125px'
    }
    return (
      <div id="content">
        <div id="profile_pic" />
        <div id="head">
          <div id="name">
            <h1>{`Hello, ${capitalize(user.name)}`} </h1>
          </div>
          {insertBreaks(3)}
          <div className="balance">
            <h3>{`${user.balance}`}</h3>
          </div>
          <div style={space}>
            <div >
              <Button
                className="toggleFormButton"
                color="primary"
                onClick={this.toggle}>
                <img height="30px" width="40px" src="./moneysign.svg" />
              </Button>
            </div>
            <div>
              <Button
                className="dropdown"
                color="primary"
                onClick={this.dropdown}>
                <img height="20px" width="40px" src="./hourglass.svg" />
              </Button>
            </div>
          </div>
        </div>
        <div id="titlebar" style=
          { styles}
          >
            <h5>
          Transaction History
        </h5>
        </div>
        <div>
          <Collapse isOpen={this.state.dropdownOpen}>
            <div className="scrollingTransactions">
              <PendingTransactions
                transactionHist={this.props.transactionHist}
                user={this.props.user}
                updateState={this.props.updateState}
              />
            </div>
          </Collapse>
        </div>
        <div>
          <Collapse isOpen={this.state.collapse}>
            <Form
              user={user}
              renderUser={renderUser}
              updateState={this.props.updateState}
            />
          </Collapse>
        </div>
        <div className="scrollingTransactions">
          <TransactionHistory transactionHist={transactionHist} user={user} />
        </div>
      </div>
    );
  }
}

export default ProfilePage;
