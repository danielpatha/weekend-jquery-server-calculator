// These are the things you need for server dawgg.
const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const PORT = 5000;

app.use(express.static('server/public'));
//With this make sure all the files needed are in public or it don't work.

app.listen(PORT,() => {
    console.log('Server is running on port', PORT)
});
// All the way down to here.

//state
let pastEAndR = [];


//I don't think I need this stuff.
// function addition(firstNum, secondNum){
//     let aProduct = firstNum + secondNum;
//     return aProduct;
// }
// function subtract(firstNum, secondNum){
//     let mProduct = firstNum - secondNum; 
//     return mProduct;
// }
// function multiply(firstNum, secondNum){
//     let mulProduct = firstNum * secondNum ;
//     return mulProduct;
// }
// function divide(firstNum, secondNum){
//     let dProduct = firstNum / secondNum;
//     return dProduct;
// }


// let operators = {
//     plus: addition(),
//     minus: subtract(),
//     times: multiply(),
//     division:divide()


// Now these are routes or /calc
app.get('/calc', function(req, res) {
   console.log('Request for /calc was made');
   
//    This will send back the data to the client side
    res.send(pastEAndR);
});

app.post('/calc', (req, res) => {
    console.log('in calc POST', req.body);
  
    let newInputsFrom = req.body;
    if(newInputsFrom.serverOperator === '+'){
        newInputsFrom.result = newInputsFrom.numberOne + newInputsFrom.numberTwo;
    }
    if(newInputsFrom.serverOperator === '-'){
        newInputsFrom.result = newInputsFrom.numberOne - newInputsFrom.numberTwo;
    }

  
    pastEAndR.push(newInputsFrom);
  
    res.sendStatus(201);
    //This is what the status code does
    //201 Created: The server created some new data for you
  
  });

//   app.get('/calc', (req, res) => {
//     console.log('in calc GET2', req.body);
    

//     res.send()
//   })