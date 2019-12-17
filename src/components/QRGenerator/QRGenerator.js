import Store from '../StoreData/StoreData';

const QRCode = require('qrcode');

const canvas = document.getElementById('canvas');
const storeName = document.querySelector('.qr-card__storeName');

Store.getQRString()
  .then((data) => {
    storeName.innerHTML = data.storeName;

    QRCode.toCanvas(
      canvas,
      data.qrString,
      {
        width: 300,
        height: 300,
      },
      (error) => {
        if (error) console.error(error);
      },
    );
  })
  .catch((error) => {
    storeName.innerHTML = 'No se encontraron tiendas disponibles';
  });
