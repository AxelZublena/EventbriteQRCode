// variable used to make a request to the Eventbrite api
let apiRequest = new XMLHttpRequest();

const apiKey = "V5BCLVS6KYNORBVVVHXV";

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

function getOrderID(data, length){
    // gets the orderID 
    let orderID= [];
    for(let i = 0; i < length; i++){
        orderID.push(data[i]);
    }

    return orderID.join('');
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

    // updates the data and orderID fields
    data.innerText = content;
    orderIDField.innerText = getOrderID(content, 10);
    
    // make a request to the Eventbrite api
    getInfo(getOrderID(content, 10), content, apiKey);
}

/**
 * @param {orderID}
 * @param {apiKey}
 *
 * Function that execute a GET request to the Eventbrite api
 */
function getInfo(orderID, content, token){
    apiRequest.onreadystatechange = () => displayInfo(content);
    apiRequest.open('GET', `https://www.eventbriteapi.com/v3/orders/${orderID}/?token=${token}`);
    apiRequest.send();
}

// Function that displays the first and last name from the api request
function displayInfo(content){
    // gets the refence of the first and last name fields
    const firstNameField = document.getElementById("firstName");
    const lastNameField = document.getElementById("lastName");

    let firstName = "";
    let lastName = "";
    let reply = {};

    // check for errors
    if(apiRequest.readyState === XMLHttpRequest.DONE){
        if(apiRequest.status === 200){
            // convert the text response to an object
            reply = JSON.parse(apiRequest.responseText);

            // gets the first and last name
            firstName = reply.first_name;
            lastName = reply.last_name;

            // displays the first and last name
            firstNameField.innerText = firstName;
            lastNameField.innerText = lastName;
        }
        else{
            console.log("Error returned: ", apiRequest.status);
            console.log("Trying other orderID format.")
            getInfo(getOrderID(content, 9), content, apiKey);
        }
    }
    else{
        console.log("Request not finished yet.");
    }

}
