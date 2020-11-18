// variable used to make a request to the Eventbrite api
let apiRequest = new XMLHttpRequest();

window.addEventListener("load", init);
function init(){
    // Instascam copy/pasting from github
    let scanner = new Instascan.Scanner({ video: document.getElementById('webcam') });
    scanner.addListener('scan', diplay);
    Instascan.Camera.getCameras().then(function (cameras) {
      if (cameras.length > 0) {
        scanner.start(cameras[0]);
      } else {
        console.error('No cameras found.');
      }
    }).catch(function (e) {
        console.error(e);
    });
}

/**
 * @param {content} Data from the qr code
 *
 * Function that diplays the qr code data and gets the orderID
 */
function diplay(content){
    // gets the refence to the data and orderID field
    const data = document.getElementById("qrData");
    const orderIDField = document.getElementById("orderID");

    // gets the orderID
    let orderID= [];
    for(let i = 0; i < 10; i++){
        orderID.push(content[i]);
    }

    // updates the data and orderID fields
    data.innerText = content;
    orderIDField.innerText = orderID.join('');

    // make a request to the Eventbrite api
    getInfo(orderID.join(''), "E6UWJNINQFY3FOBKG37L");
}

/**
 * @param {orderID}
 * @param {apiKey}
 *
 * Function that execute a GET request to the Eventbrite api
 */
function getInfo(orderID, apiKey){
    apiRequest.onreadystatechange = displayInfo;
    apiRequest.open('GET', `https://www.eventbriteapi.com/v3/users/me/?token=${apiKey}`);
    apiRequest.send();

// curl -X GET   https://www.eventbriteapi.com/v3/orders/orderID/ -H 'Authorization: Bearer E6UWJNINQFY3FOBKG37L'
}

// Function that displays the first and last name from the api request
function displayInfo(){
    // gets the refence of the first and last name fields
    const firstNameField = document.getElementById("firstName");
    const lastNameField = document.getElementById("lastName");

    let firstName = "";
    let lastName = "";

    // check for errors
    if(apiRequest.readyState === XMLHttpRequest.DONE){
        if(apiRequest.status === 200){
            // gets the first and last name
            firstName = JSON.parse(apiRequest.responseText).first_name;
            lastName = JSON.parse(apiRequest.responseText).last_name;
        }
        else{
            console.log("Error returned: ", apiRequest.status);
        }
    }
    else{
        console.log("Request not finished yet.");
    }

    // displays the first and last name
    firstNameField.innerText = firstName;
    lastNameField.innerText = lastName;
}
