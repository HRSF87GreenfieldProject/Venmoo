import React from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import axios from 'axios';
=======
import axios from 'axios'
>>>>>>> Adds post request through axios in form component
=======
import axios from 'axios'
>>>>>>> Adds post request through axios in form component
=======

>>>>>>> More clarity
=======
import axios from 'axios';
>>>>>>> Adds axios POST request
=======
import axios from 'axios';
>>>>>>> e2e9c0821155a3f28647b98cba29e9247ca673d2

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPayment: true,
      otherUser: '',
      amount: '',
      message: ''
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
    this.setState({otherUser: event.target.value})
  }

  amountChangeHandler(event) {
    event.preventDefault();
    this.setState({amount: event.target.value})
  }

  messageChangeHandler(event) {
    event.preventDefault();
    this.setState({message: event.target.value})
  }

  formSubmitHandler(event) {
    event.preventDefault();
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    var url = this.state.isPayment ? '/payment' : '/request';
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> Adds post request through axios in form component
=======

>>>>>>> Adds post request through axios in form component
=======
    var url = this.state.isPayment ? '/payment' : '/request';
>>>>>>> Adds axios POST request
=======
    var url = this.state.isPayment ? '/payment' : '/request';
>>>>>>> e2e9c0821155a3f28647b98cba29e9247ca673d2
    axios.post(url, {
      username: this.state.otherUser,
      amount: this.state.amount,
      isPayment: this.state.isPayment,
      message: this.state.message
    })
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    .then((response) => {
      console.log(response)
=======
    .then((response) => {
<<<<<<< HEAD
      console.log(response.data)
>>>>>>> Adds axios POST request
=======
      console.log(response)
>>>>>>> More test fixing
=======
    .then((response) => {
      console.log(response)
>>>>>>> e2e9c0821155a3f28647b98cba29e9247ca673d2
    })
    .catch((error) => {
      console.log(error);
    });
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> Adds post request through axios in form component
      .then((response) => {
        console.log(response); 
      })
      .catch((error) => {
      });
<<<<<<< HEAD
>>>>>>> Adds post request through axios in form component
=======
>>>>>>> Adds post request through axios in form component
=======

>>>>>>> More clarity
=======
>>>>>>> Adds axios POST request
=======
>>>>>>> e2e9c0821155a3f28647b98cba29e9247ca673d2
  }

  render() {
    return(
      <div id="form">
        <br />
        <h1> {this.state.isPayment ? 'TRUE' : 'FALSE'} </h1>
        <div className='tab'>
          <button type="submit" onClick={this.togglePaymentTrue}> Pay </button>
          <button type="submit" onClick={this.togglePaymentFalse}> Request </button>
        </div>

        <form onSubmit={this.formSubmitHandler}>
          <br />
          <br />
          <label> To: </label>
          <input type="textarea" onChange={this.otherUserChangeHandler} />
          <br />
          <br />
          <label> Amount: </label>
          $<input type="textarea" onChange={this.amountChangeHandler} />
          <br />
          <br />
          <label> Message: </label>
          <input type="textarea" onChange={this.messageChangeHandler} />
          <br />
          <br />
          <br />
          {this.state.isPayment ?
          (<div> <button id="decisionBtn" type="submit" value="Submit">
            Pay </button> </div>)
          :
          (<div> <button id="decisionBtn" type="submit"> Request </button> </div>)}
        </form>
      </div>
  )};
}

export default Form;
