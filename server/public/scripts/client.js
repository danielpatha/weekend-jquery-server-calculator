$(document).ready(handleReady);

let pastCalc = [];
let operator = '';


function handleReady(){
    console.log("jquery is loaded")
    $('#plusBtn').on('click',onPlus);
    $('#minusBtn').on('click', );
    $('#timesBtn').on('click', );
    $('#divideBtn').on('click', );



    $('#inputs','#equalBtn').on('submit',numberInputs);
    $('#clearBtn').on('click',clearBtn);
}
//We do POST first because it'll send this data to the server, 
//then gets the logic from the server
function numberInputs(){
  //evt.preventDefault();

  console.log('in numberInputs')

  let newInputs = {
    numberOne: $('#1stNumber').val(),
    numberTwo: $('#2ndNumber').val(),
    serverOperator: operator
  };
//POST, This sends DATA to the server
 $.ajax({
    url: '/calc',
    method: 'POST',
    data: newInputs
  })
  .then((response) => {
    console.log('POST /calc', response);
    if(response === 'Created')
    loadNumbers(); 
    //The render is what will append to the dom.
    // clearBtn();
  })
  .catch((err) => {
    console.log('GET /calc error', err);
  });

  $('#playerOneInput').val('');
  $('#playerTwoInput').val('');

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
    pastCalc.push(response);
    render();
  })
  .catch((err) => {
   console.log('GET /calc error', err);
  })

}

function onPlus(){
  operator = '+';
}



 function render(){
  $('#newProduct').val('')
  $('#newProduct').val(`${pastCalc[pastCalc.length -1].result}`);


  

 }


