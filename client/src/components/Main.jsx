import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import ProfilePage from './ProfilePage.jsx';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';

// The react-route 'render' method takes a callback, which itself takes in props and generates
// jsx element. This is used to pass props down to components via react-routing.
class Main extends React.Component {
  constructor(props) {
    super(props);

    this.generateProfilePage = this.generateProfilePage.bind(this);
    this.generateHomePage = this.generateHomePage.bind(this);
  }

  generateProfilePage() {
    return (
      <ProfilePage
        user={this.props.user}
        transactionHist={this.props.transactionHist}
      />
    );
  }

  generateHomePage() {
    return (
      <Login
        renderUser={this.props.renderUser}
      />
    );
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={this.generateHomePage} />
          <Route path="/profilepage/username/:username" render={this.generateProfilePage} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </div>
    );
  }
}

export default Main;
