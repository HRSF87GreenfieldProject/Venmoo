import React from 'react';
import { Collapse, Button } from 'reactstrap';
import Form from './Form.jsx';
import TransactionHistory from './TransactionHistory.jsx';
import PendingTransactions from './PendingTransactions.jsx';


class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
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
         <div >
          <Button className="toggleFormButton" color="primary" onClick={this.toggle}> <img height='50px' width='70px' src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUxMiA1MTIiIGhlaWdodD0iNTEycHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iNTEycHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik0yNTYsNzMuMDg5Yy0xMDAuODY0LDAtMTgyLjkxMSw4Mi4wNTgtMTgyLjkxMSwxODIuOTE3UzE1NS4xMzYsNDM4LjkxMSwyNTYsNDM4LjkxMSAgYzEwMC44NTksMCwxODIuOTExLTgyLjA0NiwxODIuOTExLTE4Mi45MDVTMzU2Ljg2LDczLjA4OSwyNTYsNzMuMDg5eiBNMjU2LDQxMC4wNTljLTg0Ljk1MSwwLTE1NC4wNi02OS4xMDgtMTU0LjA2LTE1NC4wNTQgIGMwLTg0Ljk1Niw2OS4xMDktMTU0LjA2NSwxNTQuMDYtMTU0LjA2NWM4NC45NTEsMCwxNTQuMDYsNjkuMTA5LDE1NC4wNiwxNTQuMDY1QzQxMC4wNiwzNDAuOTUxLDM0MC45NTEsNDEwLjA1OSwyNTYsNDEwLjA1OXoiLz48cGF0aCBkPSJNMjI3LjA3NiwyMjAuMTU3YzAtMTEuNTcyLDE2LjkyNS0xMy41NDgsMzEuNjA2LTEzLjU0OGMxMy44MzcsMCwzMi43NDQsNi40ODUsNDguNTUzLDE0LjY4MWwzLjA5OC0zMS44OTUgIGMtNy45MDYtNC41Mi0yNi4yNDctOS44ODQtNDQuODc3LTExLjAwNWw0LjUxNS0zMi40NjFIMjM5Ljc3bDQuNTIxLDMyLjQ2MWMtMzguOTQ3LDMuNjY0LTUxLjY1MSwyNi4yNDItNTEuNjUxLDQ1LjE1NCAgYzAsNDcuNjk3LDg4Ljg5OCwzNy41NDcsODguODk4LDY2Ljg4OGMwLDExLjAxNy0xMC40MzQsMTQuOTU5LTI4Ljc4NSwxNC45NTljLTI0LjgzMiwwLTQzLjQ2Ny04Ljc0LTUzLjA1Ni0xNy43NzlsLTQuODAzLDM1Ljg0OCAgYzkuMDQsNS4zNjQsMjcuMzc1LDEwLjE2MSw0OS4zOTcsMTEuMjk0bC00LjUyMSwzMS4zMjloMzAuMjAxbC00LjUxNS0zMS42MTdjNDUuNzIyLTMuOTU0LDUzLjkwNi0yOC4yMyw1My45MDYtNDQuMzExICBDMzE5LjM2MywyMzMuNDI4LDIyNy4wNzYsMjQ3LjUzMiwyMjcuMDc2LDIyMC4xNTd6Ii8+PC9zdmc+"/> </Button>
        </div>
        <PendingTransactions transactionHist={this.props.transactionHist} user={this.props.user}/>
      </div>);
       </div>
        <div>
         <Collapse isOpen={this.state.collapse}>
          <Form user={this.props.user}
          renderUser={this.props.renderUser}/>
        </Collapse>
       </div>
        <div className="scrollingTransactions">
         <TransactionHistory transactionHist={this.props.transactionHist} user={this.props.user} />
       </div>
      </div>
    );
  }
}

export default ProfilePage;

{ /* <div>
  PROFILE PAGE
  <Form />
  <TransactionHistory transactionHist={this.props.transactionHist}/>
</div> */ }
