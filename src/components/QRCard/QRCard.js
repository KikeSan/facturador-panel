import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode.react';
import StoreData from '../StoreData/StoreData';

import '../../assets/styles/components/QRCard.scss';


// Componente funcional
const QRCard = () => {

  // Definimos los estados
  const [qrOptions, updateQROptions] = useState({
    className: 'is-hidden',
    text: '',
    storeName: 'Buscando tienda ...'
  });

  useEffect (() => {
    let isSubscribed = true;

    StoreData.getQRString().then((data)=>{

      setTimeout(() => {
        if (!isSubscribed) return false;

        updateQROptions({
          className: '',
          text: data.qrString,
          storeName: data.storeName
        });
      }, 500);


    }).catch((message) => {
      if (!isSubscribed) return false;

      // Actualiza la UI cuando no se encontró una tienda
      updateQROptions({
        className: 'is-hidden',
        text: '',
        storeName: 'Esta red no tiene una tienda asignada.'
      });

    });

    return () => (isSubscribed = false);

  }, []);

  return (
    <div className="qrcard__contentWrapper">
      <div className="qrcard">
        <div className="card blue-grey darken-2">
          <div className="card-content white-text">
            <span className="qrcard__title card-title">Tienda</span>
            <div className="qrcard__storeName">{qrOptions.storeName}</div>
            <div className="qrcard__canvas">
              <QRCode value={qrOptions.text} className={qrOptions.className} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QRCard;
