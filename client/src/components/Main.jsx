import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import ProfilePage from './ProfilePage.jsx';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import VenmooTitle from './VenmooTitle.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToProfilePage: props.redirectToProfilePage,
    };
    this.generateProfilePage = this.generateProfilePage.bind(this);
    this.generateHomePage = this.generateHomePage.bind(this);
  }

  componentDidUpdate() {
    this.render();
  }

  generateProfilePage() {
    return (
      <ProfilePage
        user={this.props.user}
        transactionHist={this.props.transactionHist}
        renderUser={this.props.renderUser}
        updateState={this.props.updateState}
      />
    );
  }

  generateHomePage() {
    const { renderUser, user, redirectToProfilePage } = this.props;
    return this.props.redirectToProfilePage ? (
      <ProfilePage
        user={this.props.user}
        transactionHist={this.props.transactionHist}
        renderUser={this.props.renderUser}
        updateState={this.props.updateState}
      />
    ) : (
      <Login
        renderUser={renderUser}
        user={user}
        redirectToProfilePage={redirectToProfilePage}
      />
    )
  }

  render() {
    return (
      <div>
        <BrowserRouter >
          <Switch>
            <Route path="/" render={this.generateHomePage} />
            <Route path="/profilepage" render={this.generateProfilePage} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default Main;
