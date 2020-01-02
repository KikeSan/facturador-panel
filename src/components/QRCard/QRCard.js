import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode.react";
import StoreData from "../StoreData/StoreData";

import "../../assets/styles/components/QRCard.scss";
import logo from "../../assets/img/logo-qr.png";
import SelectAllIcon from "@material-ui/icons/SelectAll";

// Componente funcional
const QRCard = () => {
  // Definimos los estados
  const [qrOptions, updateQROptions] = useState({
    className: "is-hidden",
    text: "",
    storeName: "Buscando tienda ..."
  });

  const imageSettings = {
    src: logo,
    width: 93,
    height: 25,
    excavate: true
  };

  useEffect(() => {
    let isSubscribed = true;

    StoreData.getQRString()
      .then(data => {
        setTimeout(() => {
          if (!isSubscribed) return false;

          updateQROptions({
            className: "",
            text: data.qrString,
            storeName: data.storeName
          });
        }, 500);
      })
      .catch(message => {
        if (!isSubscribed) return false;

        // Actualiza la UI cuando no se encontró una tienda
        updateQROptions({
          className: "is-hidden",
          text: "",
          storeName: "Esta red no tiene una tienda asignada."
        });
      });

    return () => (isSubscribed = false);
  }, []);

  return (
    <div className="qrcard__contentWrapper">
      <div className="qrcard">
        <div className="card fondoBlanco">
          <div className="tituloPage fondoAzul textoBlanco">
            {/* <i className="material-icons tituloPage__icon">select_all</i> */}
            <SelectAllIcon />
            <span className="tituloPage__texto">Código QR</span>
          </div>
          <div className="card-content textoGris">
            <div className="qrcard__title card-title">Tienda</div>
            <div className="qrcard__storeName">{qrOptions.storeName}</div>
            <div className="qrcard__canvas">
              <QRCode
                value={qrOptions.text}
                size={256}
                renderAs={"svg"}
                fgColor={"#04234c"}
                level={"Q"}
                className={qrOptions.className}
                imageSettings={imageSettings}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCard;
