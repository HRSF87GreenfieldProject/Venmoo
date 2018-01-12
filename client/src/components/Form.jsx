import React from 'react';
import axios from 'axios';
import { Card } from 'reactstrap'

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPayment: true,
      otherUser: '',
      amount: '',
      message: '',
    };

    this.togglePaymentTrue = this.togglePaymentTrue.bind(this);
    this.togglePaymentFalse = this.togglePaymentFalse.bind(this);
    this.otherUserChangeHandler = this.otherUserChangeHandler.bind(this);
    this.amountChangeHandler = this.amountChangeHandler.bind(this);
    this.messageChangeHandler = this.messageChangeHandler.bind(this);
    this.formSubmitHandler = this.formSubmitHandler.bind(this);
  }


  togglePaymentTrue(event) {
    event.preventDefault();
    if (!this.state.isPayment) {
      this.setState({ isPayment: true });
    }
  }

  togglePaymentFalse(event) {
    event.preventDefault();
    if (this.state.isPayment === true) {
      this.setState({ isPayment: false });
    }
  }

  otherUserChangeHandler(event) {
    event.preventDefault();
    this.setState({ otherUser: event.target.value });
  }

  amountChangeHandler(event) {
    event.preventDefault();
    this.setState({ amount: event.target.value });
  }

  messageChangeHandler(event) {
    event.preventDefault();
    this.setState({ message: event.target.value });
  }

  formSubmitHandler(event) {
    event.preventDefault();
    const url = this.state.isPayment ? '/payment' : '/request';
    axios.post(url, {
      username: this.state.otherUser,
      amount: this.state.amount,
      isPayment: this.state.isPayment,
      message: this.state.message,
    })

      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
    <div id="form" className="container">
    <Card >
        <br />
        <h1>
          {" "}
          {this.state.isPayment
            ? "Pay a friend"
            : "Request money from a friend"}{" "}
        </h1>
        <div className="tab container">
          <button type="submit" onClick={this.togglePaymentTrue}>
            {" "}
            Pay{" "}
          </button>
          <button type="submit" onClick={this.togglePaymentFalse}>
            {" "}
            Request{" "}
          </button>
        </div>

        <form onSubmit={this.formSubmitHandler}>
          <br />
          <br />
          <label> To: </label>
          <input className="container" type="textarea" onChange={this.otherUserChangeHandler} />
          <br />
          <br />
          <label> Amount: </label>
          $<input className="container" type="textarea" onChange={this.amountChangeHandler} />
          <br />
          <br />
          <label> Message: </label>
          <input className="container" type="textarea" onChange={this.messageChangeHandler} />
          <br />
          <br />
          <br />
          {this.state.isPayment ? <div className="container">
              {" "}
              <button className="container" id="decisionBtn" type="submit" value="Submit">
                Pay
              </button>
            </div> : <div>
              {" "}
              <button id="decisionBtn" type="submit">
                {" "}
                Request{" "}
              </button>{" "}
            </div>}
        </form>
      </Card >
      </div>);
  }
}

export default Form;
