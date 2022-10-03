$(document).ready(handleReady);
//the state
let pastCalc = [];




function handleReady(){
    console.log("jquery is loaded")
    loadNumbers();
    $('#plusBtn').on('click',onPlus);
    $('#minusBtn').on('click',onMinus);
    $('#timesBtn').on('click',onTimes);
    $('#divideBtn').on('click',onDivide);

    $('#equalBtn').on('click',numberInputs);
    $('#clearBtn').on('click',clearInputs);
}

let newInputs = {
};

function onPlus(evt){
  evt.preventDefault();
  newInputs.ops = '+'
}
function onMinus(evt){
  evt.preventDefault();
  newInputs.ops = '-'
}
function onTimes(evt){
  evt.preventDefault();
  newInputs.ops = '*'
}
function onDivide(evt){
  evt.preventDefault();
  newInputs.ops = '/'
}

//We do POST first because it'll send this data to the server, 
//then gets the logic from the server

function numberInputs(evt){
  evt.preventDefault();
  console.log("equalbtn");
  console.log('in numberInputs')
  
 
  newInputs.numberOne = $('#1stNumber').val(),
  newInputs.numberTwo = $('#2ndNumber').val(),


//POST, This sends DATA to the server
 $.ajax({
    url: '/calc',
    method: 'POST',
    data: newInputs
    //You should always send a object here
  })
  .then(response => {
    console.log('POST/calc response', response);
    loadNumbers(); 
    //The render is what will append to the dom.
    // clearBtn();
  })
  .catch((err) => {
    console.log('GET /calc error', err);
  });
  clearInputs();
}
function clearInputs(){
$('#1stNumber').val('');
$('#2ndNumber').val('');
}



function loadNumbers(){
  console.log('in loadNumbers');

  //GET requests data from the server
  $.ajax({
    url: '/calc',
    method: 'GET',
  })
  .then((response) => {
    console.log('GET /calc', response);
    pastCalc = response;
    render();
    renderHistory(pastCalc);
  })
  .catch((err) => {
   console.log('GET /calc error', err);
  })


}



 function render(){
  $('#newProduct').empty()
  $('#newProduct').append(`${pastCalc[pastCalc.length -1].result}`);
 }

//  function loadHistory(){
//  console.log('In load History')
//  $.ajax({
//   url: '/calc2',
//   method: 'GET',
// })
// .then((response) => {
//   console.log('GET /calc', response);
//   renderHistory(response);
// })
// .catch((err) => {
//  console.log('GET /calc error', err);
// })
//  }

//I tried to add this, but it wouldn't work, 
//so I just called the renderHistory function in the 1st get method.

 function renderHistory(newFormula){
  $('#pastProducts').empty()
  for(let formula of newFormula){
    $('#pastProducts').append(`<li>
 ${formula.numberOne}
 ${formula.ops}
 ${formula.numberTwo} =
 ${formula.result}</li>`)
 }
}
