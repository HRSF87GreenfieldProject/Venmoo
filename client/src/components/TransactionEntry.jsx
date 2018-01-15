import React from 'react';
import { Card, CardBody, CardSubtitle, CardTitle, CardText, Button } from 'reactstrap'
const moment = require('moment');


import { capitalize } from './../helpers.jsx';


class TransactionEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { transaction, user } = this.props;
    const sender = capitalize(transaction.sender_name === user.name ? 'you' : transaction.sender_name);
    const receiver = capitalize(transaction.receiver_name === user.name ? 'you' : transaction.receiver_name);

    const timestamp = transaction.resolved_timestamp;
    const text = `${sender} paid ${receiver} ${transaction.amount}`;


    return (
      <div id="transactionCard">
        <Card>
          <CardBody>
            <CardTitle>Transaction:</CardTitle>
            <CardSubtitle>{moment(timestamp).format('lll')}</CardSubtitle>
            <CardText>
              {text}
            </CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default TransactionEntry;

