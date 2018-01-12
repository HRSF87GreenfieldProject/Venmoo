const transactions = [
 {
   "id": 1,
   "sender_id": 1,
   "receiver_id": 2,
   "amount": 96,
   "status": "approved",
   "type": "payment",
   "request_timestamp": "2018-01-01 4:05:06",
   "resolved_timestamp": "2018-01-01 4:05:06"
 },
 {
   "id": 2,
   "sender_id": 1,
   "receiver_id": 2,
   "amount": 16,
   "status": "approved",
   "type": "request",
   "request_timestamp": "2018-01-02 4:05:15",
   "resolved_timestamp": "2018-01-02 15:21:00"
 },
 {
   "id": 3,
   "sender_id": 1,
   "receiver_id": 2,
   "amount": 108,
   "status": "approved",
   "type": "request",
   "request_timestamp": "2018-01-02 6:00:00",
   "resolved_timestamp": "2018-01-05 0:00:01"
 },
 {
   "id": 4,
   "sender_id": 2,
   "receiver_id": 1,
   "amount": 133,
   "status": "approved",
   "type": "payment",
   "request_timestamp": "2018-01-02 7:00:00",
   "resolved_timestamp": "2018-01-02 7:00:00"
 },
 {
   "id": 5,
   "sender_id": 5,
   "receiver_id": 6,
   "amount": 127,
   "status": "approved",
   "type": "request",
   "request_timestamp": "2018-01-03 7:00:00",
   "resolved_timestamp": "2018-01-08 12:25:00"
 },
 {
   "id": 6,
   "sender_id": 5,
   "receiver_id": 7,
   "amount": 173,
   "status": "canceled",
   "type": "request",
   "request_timestamp": "2018-01-03 10:15:11",
   "resolved_timestamp": "2018-01-04 5:00:00"
 },
 {
   "id": 7,
   "sender_id": 6,
   "receiver_id": 7,
   "amount": 195,
   "status": "approved",
   "type": "payment",
   "request_timestamp": "2018-01-03 10:15:11",
   "resolved_timestamp": "2018-01-03 10:15:11"
 },
 {
   "id": 8,
   "sender_id": 7,
   "receiver_id": 1,
   "amount": 102,
   "status": "approved",
   "type": "payment",
   "request_timestamp": "2018-01-03 13:51:00",
   "resolved_timestamp": "2018-01-03 13:51:00"
 },
 {
   "id": 9,
   "sender_id": 1,
   "receiver_id": 7,
   "amount": 95,
   "status": "approved",
   "type": "payment",
   "request_timestamp": "2018-01-04 13:51:00",
   "resolved_timestamp": "2018-01-04 13:51:00"
 },
 {
   "id": 10,
   "sender_id": 2,
   "receiver_id": 3,
   "amount": 183,
   "status": "declined",
   "type": "request",
   "request_timestamp": "2018-01-04 17:51:00",
   "resolved_timestamp": "2018-01-05 12:12:12"
 },
 {
   "id": 11,
   "sender_id": 3,
   "receiver_id": 2,
   "amount": 34,
   "status": "approved",
   "type": "payment",
   "request_timestamp": "2018-01-04 17:51:00",
   "resolved_timestamp": "2018-01-04 17:51:00"
 },
 {
   "id": 12,
   "sender_id": 3,
   "receiver_id": 4,
   "amount": 39,
   "status": "declined",
   "type": "request",
   "request_timestamp": "2018-01-04 13:51:00",
   "resolved_timestamp": "2018-01-04 23:23:23"
 },
 {
   "id": 13,
   "sender_id": 4,
   "receiver_id": 6,
   "amount": 41,
   "status": "pending",
   "type": "request",
   "request_timestamp": "2018-01-05 02:51:00",
   "resolved_timestamp": ""
 },
 {
   "id": 14,
   "sender_id": 6,
   "receiver_id": 5,
   "amount": 144,
   "status": "pending",
   "type": "request",
   "request_timestamp": "2018-01-05 03:51:00",
   "resolved_timestamp": ""
 },
 {
   "id": 15,
   "sender_id": 5,
   "receiver_id": 6,
   "amount": 19,
   "status": "canceled",
   "type": "request",
   "request_timestamp": "2018-01-05 13:52:11",
   "resolved_timestamp": "2018-01-08 14:15:14"
 },
 {
   "id": 16,
   "sender_id": 6,
   "receiver_id": 7,
   "amount": 75,
   "status": "approved",
   "type": "payment",
   "request_timestamp": "2018-01-05 13:52:12",
   "resolved_timestamp": "2018-01-05 13:52:12"
 },
 {
   "id": 17,
   "sender_id": 6,
   "receiver_id": 7,
   "amount": 158,
   "status": "approved",
   "type": "request",
   "request_timestamp": "2018-01-05 13:52:13",
   "resolved_timestamp": "2018-01-08 14:14:14"
 },
 {
   "id": 18,
   "sender_id": 7,
   "receiver_id": 6,
   "amount": 111,
   "status": "pending",
   "type": "request",
   "request_timestamp": "2018-01-05 13:52:14",
   "resolved_timestamp": ""
 },
 {
   "id": 19,
   "sender_id": 4,
   "receiver_id": 3,
   "amount": 107,
   "status": "pending",
   "type": "request",
   "request_timestamp": "2018-01-05 13:52:15",
   "resolved_timestamp": ""
 },
 {
   "id": 20,
   "sender_id": 2,
   "receiver_id": 3,
   "amount": 189,
   "status": "approved",
   "type": "payment",
   "request_timestamp": "2018-01-05 13:52:16",
   "resolved_timestamp": "2018-01-05 13:52:16"
 }
]
const users = [
 {
   "id": 1,
   "username": "annie",
   "balance": 100
 },
 {
   "id": 2,
   "username": "bonnie",
   "balance": 120
 },
 {
   "id": 3,
   "username": "connie",
   "balance": 0
 },
 {
   "id": 4,
   "username": "donny",
   "balance": 50
 },
 {
   "id": 5,
   "username": "eddie",
   "balance": 71
 },
 {
   "id": 6,
   "username": "freddy",
   "balance": 65
 },
 {
   "id": 7,
   "username": "geddy",
   "balance": 88
 }
]

const response = {
  "user": {
      "id": 1,
      "name": "annie",
      "balance": "$100.00"
  },
  "transactions": [
      {
          "transaction_id": 1,
          "amount": "$48.00",
          "status": "approved",
          "type": "payment",
          "created_timestamp": "2018-01-01T12:05:06.000Z",
          "resolved_timestamp": "2018-01-01T12:05:06.000Z",
          "description": null,
          "sender_name": "annie",
          "receiver_name": "bonnie"
      },
      {
          "transaction_id": 2,
          "amount": "$153.00",
          "status": "approved",
          "type": "request",
          "created_timestamp": "2018-01-02T12:05:15.000Z",
          "resolved_timestamp": "2018-01-02T23:21:00.000Z",
          "description": null,
          "sender_name": "annie",
          "receiver_name": "bonnie"
      },
      {
          "transaction_id": 3,
          "amount": "$6.00",
          "status": "approved",
          "type": "request",
          "created_timestamp": "2018-01-02T14:00:00.000Z",
          "resolved_timestamp": "2018-01-05T08:00:01.000Z",
          "description": null,
          "sender_name": "annie",
          "receiver_name": "bonnie"
      },
      {
          "transaction_id": 4,
          "amount": "$25.00",
          "status": "approved",
          "type": "payment",
          "created_timestamp": "2018-01-02T15:00:00.000Z",
          "resolved_timestamp": "2018-01-02T15:00:00.000Z",
          "description": null,
          "sender_name": "bonnie",
          "receiver_name": "annie"
      },
      {
          "transaction_id": 8,
          "amount": "$39.00",
          "status": "approved",
          "type": "payment",
          "created_timestamp": "2018-01-03T21:51:00.000Z",
          "resolved_timestamp": "2018-01-03T21:51:00.000Z",
          "description": null,
          "sender_name": "geddy",
          "receiver_name": "annie"
      },
      {
          "transaction_id": 9,
          "amount": "$171.00",
          "status": "approved",
          "type": "payment",
          "created_timestamp": "2018-01-04T21:51:00.000Z",
          "resolved_timestamp": "2018-01-04T21:51:00.000Z",
          "description": null,
          "sender_name": "annie",
          "receiver_name": "geddy"
      }
  ]
}

module.exports = {
  users,
  transactions,
  response,
};

