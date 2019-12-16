var QRCode = require("qrcode");
import Store from "../Store/Store";

const canvas = document.getElementById("canvas");
const storeName = document.querySelector(".App__storeName");

Store.getQRString()
  .then(data => {
    console.log(data);

    storeName.innerHTML = data.storeName;

    QRCode.toCanvas(
      canvas,
      data.qrString,
      {
        width: 300,
        height: 300
      },
      function(error) {
        if (error) console.error(error);
      }
    );
  })
  .catch(error => {
    storeName.innerHTML = "No se encontraron tiendas disponibles";
  });
