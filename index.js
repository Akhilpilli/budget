const fs = require('fs');
let functionFile = './model.js';
var model = require(functionFile);
var dictionary = {};

var express = require('express');
var app = express();
var request = require('request');
const bodyParser = require('body-parser');

dictionary = model.init();

const accountSid = "AC4acc2213378db4664ccb6ff8f5cfb019";
const authToken = "1ceac58f966a4b97ee32dbe29745d1bf";

const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));


app.post('/incoming', (req, res) => {
	
	const twiml = new MessagingResponse();
	var Message = req.body.Body;
	var RecivedMessage = req.body.Body;
	var number = req.body.From;
	var mobileNumber = String(number.substring(12,22));	
	var Key = (RecivedMessage.replace(/[^a-z]/gi,'')).toLowerCase();
	
	var AmountSpentOne = RecivedMessage.replace(/\D/g,'');
	var AmountSpent = parseInt(RecivedMessage.replace(/\D/g,''));

	
	
	
Key = String(model.getKey(Key));
	
var msg = twiml.message(model.getMessageMain(mobileNumber, Key, AmountSpent));

	res.end(twiml.toString());
});


app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

