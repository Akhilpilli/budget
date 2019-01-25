const fs = require('fs');
var dicFile = './dictionary.json';
var dictionaryFile = require(dicFile);
var fileName = './data.json';
var clientsData = require(fileName);
let functionFile = './model.js';
var model = require(functionFile);
var ErrorMessage = "Message is not in correct formate it should look like 'Included-category:Amount-you-spent'\nIncluded category's are - 'food','cloth','travel'\nor\nTo know your expenditure send get\nor\nTo reset your expenditure send reset.";
var dictionary = {};
module.exports.init = function(){
	
	var DictionaryKey;
	for (i in dictionaryFile ) {
			for (j in dictionaryFile[i].words) {
				DictionaryKey = dictionaryFile[i].words[j];
				dictionary[DictionaryKey] = dictionaryFile[i].category;
			}
	}
	return dictionary;
}

module.exports.getMessageMain = function(mobileNumber, Key, AmountSpent){
var UpdatingString = ',"' + mobileNumber + '":' + '{"food":0,"cloth":0,"travel":0}';
	if(clientsData.hasOwnProperty(mobileNumber)){
		if(clientsData[mobileNumber].hasOwnProperty(Key)){
			if (isNaN(AmountSpent)){
			 return 'Enter amount to the category.';
			}
			else{
				clientsData[mobileNumber][Key] += AmountSpent;
			fs.writeFile(fileName, JSON.stringify(clientsData), function (err) {
 			if (err) return console.log(err);
  		console.log(JSON.stringify(clientsData));
  		console.log('writing to ' + fileName);
			});
			}
		}
		else if(Key == 'get' ){
			var Total = model.getTotal(mobileNumber);
			return 'Total Amount spent\nFood\t:\t' + clientsData[mobileNumber].food + '\nCloth\t:\t' + clientsData[mobileNumber].cloth + '\nTravel\t:\t' + clientsData[mobileNumber].travel +'\nTotal\t:\t'+ Total +'.';
		}
		else if(Key == 'reset'){
			model.resetExpenditure(mobileNumber);
			return 'Your expenditure has been reset.';
		}
		else{
			return ErrorMessage;
		}
	}
else{
	model.updateNumber(UpdatingString);
	return 'Your number has been added.';
	
}
}
module.exports.getKey = function(Key){
	return dictionary[Key];
}


module.exports.updateAmount = function(mobileNumber,Key,AmountSpent){
	
}


module.exports.getTotal = function(mobileNumber){
	return clientsData[mobileNumber].food + clientsData[mobileNumber].cloth + clientsData[mobileNumber].travel;
}

module.exports.getMessage = function(mobileNumber, Total){
	
}

module.exports.resetExpenditure = function(mobileNumber){
			clientsData[mobileNumber].food = 0;
			clientsData[mobileNumber].cloth = 0;
			clientsData[mobileNumber].travel = 0;
			fs.writeFile(fileName, JSON.stringify(clientsData), function (err) {
 			if (err) return console.log(err);
  		console.log(JSON.stringify(clientsData));
  		console.log('writing to ' + fileName);
			});
}

module.exports.updateNumber =function(UpdatingString){
	var FileUpdate = JSON.stringify(clientsData);
	FileUpdate = FileUpdate.slice(0,FileUpdate.length-1);
	FileUpdate += UpdatingString + '}';
	fs.writeFile(fileName, FileUpdate, function (err) {
 			if (err) return console.log(err);
  		console.log(JSON.stringify(clientsData));
  		console.log('writing to ' + fileName);
			});
}