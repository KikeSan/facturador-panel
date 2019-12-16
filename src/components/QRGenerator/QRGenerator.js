var QRCode = require("qrcode");
import Store from "../StoreData/StoreData";

const canvas = document.getElementById("canvas");
const storeName = document.querySelector(".qr-card__storeName");

Store.getQRString()
  .then(data => {
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
