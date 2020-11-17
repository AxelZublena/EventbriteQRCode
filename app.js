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
    data.innerText = content;
}
