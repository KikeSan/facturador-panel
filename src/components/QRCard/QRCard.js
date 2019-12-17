import React from 'react';
import '../../assets/styles/components/QRCard.scss';

// import QRCode from 'qrcode.react';
// import Store from '../StoreData/StoreData';



const QRCard = () => (
  <div className="qrcard__contentWrapper">
    <div className="qrcard">
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="qrcard__title card-title">Tienda</span>
          <div className="qrcard__storeName" />
          <div className="qrcard__canvas" />
        </div>
      </div>
    </div>
  </div>
);

export default QRCard;
