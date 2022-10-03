$(document).ready(handleReady);
//the state
let pastCalc = [];




function handleReady(){
    console.log("jquery is loaded")
    $('#plusBtn').on('click',onPlus);
    $('#minusBtn').on('click',onMinus);
    $('#timesBtn').on('click',onTimes);
    $('#divideBtn').on('click',onDivide);

    $('#equalBtn').on('click',numberInputs);
    //$('#clearBtn').on('click',numberInputs);
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
  })
  .catch((err) => {
   console.log('GET /calc error', err);
  })


}



 function render(){
  $('#newProduct').empty()
  $('#newProduct').append(`${pastCalc[pastCalc.length -1].result}`);
 }

 function loadHistory(){
 console.log('In load History')
//  $.ajax({
//   url: '/calc',
//   method: 'GET',
// })
// .then((response) => {
//   console.log('GET /calc', response);
//   pastCalc.push(response);
//   render();
// })
// .catch((err) => {
//  console.log('GET /calc error', err);
// })
 }

