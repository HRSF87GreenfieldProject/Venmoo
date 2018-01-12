import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import jquery from 'jquery';

import ProfilePage from './ProfilePage.jsx';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }

  getRequest() {
    jquery.ajax({
      url: `/profilepage/username/${this.state.username}`,
      type: 'GET',
      dataType: 'json',
      success: (data) => {
        console.log('success: ', data);
        this.props.renderUser(data.user, data.transactions)
        console.log(data.user)
        console.log(data.transactions)
      },
      error: (err) => {
        console.log('error in ajax get ', err);
      },
    });
  }

  handleChange(event) {
    this.setState({ username: event.target.value });
  }

  render() {
    return (
      <form action="/login" method="post">
        <div>
        <label>Username:</label>
        <input type="text" onChange={this.handleChange.bind(this)} name="username" />
      </div>
        <div>
        <label>Password:</label>
        <input type="password" name="password" />
      </div>
        <div>
        <Link to={`/profilepage/username/${this.state.username}`}>
          <input className="loginButton" type="submit" onClick={() => this.getRequest()} value="Log In" />
        </Link>
        <br />
        <Link to="/signup">
          <input className="loginButton" type="submit" value="No Account? Sign Up Here" />
        </Link>
      </div>
      </form>
    );
  }
}

export default Login;
