import axios from 'axios';
import config from 'components/Config/Config';

/**
 * Obtiene la IP de la máquina local del usuario
 * @returns promise
 * @memberOf Store
 */
const getUserLocalIp = () => {
  // compatibility for firefox and chrome
  const myPeerConnection = window.RTCPeerConnection
    || window.mozRTCPeerConnection
    || window.webkitRTCPeerConnection;
  const pc = new myPeerConnection({ iceServers: [] });
  const noop = function () {};
  const localIPs = {};
  const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
  let key;

  let resolve;
  let reject;
  const promise = new Promise(((res, rej) => {
    resolve = res;
    reject = rej;
  }));

  function iterateIP(ip) {
    if (!localIPs[ip]) {
      resolve(ip);
    }
    localIPs[ip] = true;
  }

  // create a bogus data channel
  pc.createDataChannel('');

  // create offer and set local description
  pc.createOffer()
    .then((sdp) => {
      let counter = 0;
      sdp.sdp.split('\n').forEach((line) => {
        if (line.indexOf('candidate') < 0) {
          return;
        }
        line.match(ipRegex).forEach(iterateIP);
        counter++;
      });
      pc.setLocalDescription(sdp, noop, noop);
      // if (counter === 0) {
      //   reject();
      // }
    })
    .catch(reject);

  // listen for candidate events
  pc.onicecandidate = function (ice) {
    if (
      !ice
      || !ice.candidate
      || !ice.candidate.candidate
      || !ice.candidate.candidate.match(ipRegex)
    ) {
      return;
    }
    ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
  };

  return promise;
};

/**
 * Busca el código de tienda usando el IP local del usuario
 * @returns promise
 * @memberOf Store
 */
const getCode = () => {
  const promise = new Promise((resolve, reject) => {
    // Consulta la IP local
    getUserLocalIp()
      .then((_ip) => {
        const red = _ip.split('.', 3).join('.');

        axios
          .get(`${config.PATH}/data/stores.json`)
          .then((response) => {
            const StoreData = response.data.stores;

            // Busca el código de tienda
            const storeCodeList = StoreData.filter((store) =>
            // console.log(store);

              red === store.red.split('.', 3).join('.'));

            // Si encuentra una tienda, devuelve los datos
            if (storeCodeList.length) {
              const storeCodeData = storeCodeList[0] || null;
              const storeCode = storeCodeData.codigo_tienda;
              const storeName = storeCodeData.nombre_tienda;

              resolve({ storeCode, storeName });
            }

            // Si no encuentra tienda, resuelve como error
            else {
              reject();
            }
          })
          .catch(reject);
      })
      .catch(reject);
  });

  return promise;
};

/**
 * Busca el código de tienda usando el IP local del usuario
 * @returns promise
 * @memberOf Store
 */
function getQRString() {
  return new Promise((resolve, reject) => {
    getCode()
      .then((data) => {
        // Crea el texto para generar el QR
        const qrString = `${data.storeCode}|${new Date().getTime()}`;
        const { storeName } = data;

        const response = { qrString, storeName };
        resolve(response);
      })
      .catch(() => {
        reject();
      });
  });
}

export default { getQRString };
