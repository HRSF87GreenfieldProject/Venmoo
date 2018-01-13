import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, Switch } from 'react-router-dom';

import { users, transactions } from './../../../database/dummy-data.js';

import Login from './Login.jsx';
import Main from './Main.jsx';
import ProfilePage from './ProfilePage.jsx';
import VenmooTitle from './VenmooTitle.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: users[0],
      transactionHist: transactions,
    };
  }

  render() {
    return (
      <div>
        <VenmooTitle />
        <Main user={this.state.user} transactionHist={this.state.transactionHist}/>
      </div>
    );
  }
}

export default App;
