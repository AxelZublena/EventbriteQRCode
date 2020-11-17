window.addEventListener("load", init);

function init(){
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

function diplay(content){
    const data = document.getElementById("qrData");
    const orderIDField = document.getElementById("orderID");
    const attendeeIDField = document.getElementById("attendeeID");

    let attendeeID = [];
    for(let i = 10; i < 20; i++){
        attendeeID.push(content[i]);
    }
    let orderID = [];
    for(let i=0; i< 10; i++){
        orderID.push(content[i]);
    }

    data.innerText = content;
    orderIDField.innerText = orderID.join('');
    attendeeIDField.innerText = attendeeID.join('');
}
