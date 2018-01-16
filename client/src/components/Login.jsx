import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import { insertBreaks } from './../helpers.jsx';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToProfilePage: props.redirectToProfilePage,
      username: '',
      password: '',
      displayWarning: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  postRequest(username, password) {
    Axios.post('/profilepage', {
      username,
      password,
    })
      .then((res) => {
        this.props.renderUser(res.data.user, res.data.transactions);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          this.setState({
            displayWarning: true,
          });
        } else {
          console.error(err);
        }
      });
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.postRequest(this.state.username, this.state.password);
  }

  render() {
    const style = {
      'margin-left':'-30 px'
    }
    return (
      <div id="login">
        <p id="loginWarning" className={this.state.displayWarning ? 'display' : 'hide'}>
          Invalid username and/or password. Please try again, or sign up.
        </p>
        <div id="contentLogin">
          <form>
            <div>
              {insertBreaks(2)}
              <h3> Moove Your Mooney </h3>
              <label>Username:</label>
              <input
                type="text"
                onChange={this.handleUsernameChange}
                name="username"
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                onChange={this.handlePasswordChange}
                name="password"
              />
            </div>
            <div>
              <input
                className="loginButton"
                type="submit"
                onClick={this.handleSubmit}
                value="Log In"
              />
              {insertBreaks(6)}
              <Link to="/signup">
                <input className="loginButton" className="greenbtn" style={style} type="submit" value="No Account? Sign Up Here" />
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


export default Login;
