/**
 * Obtiene la IP de la máquina local del usuario
 * @returns promise
 * @memberOf Store
 */
const getUserLocalIp = () => {
  //compatibility for firefox and chrome
  var myPeerConnection =
    window.RTCPeerConnection ||
    window.mozRTCPeerConnection ||
    window.webkitRTCPeerConnection;
  var pc = new myPeerConnection({ iceServers: [] });
  var noop = function() {};
  var localIPs = {};
  var ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
  var key;

  var resolve;
  var reject;
  var promise = new Promise(function(res, rej) {
    resolve = res;
    reject = rej;
  });

  function iterateIP(ip) {
    if (!localIPs[ip]) {
      resolve(ip);
    }
    localIPs[ip] = true;
  }

  //create a bogus data channel
  pc.createDataChannel("");

  // create offer and set local description
  pc.createOffer()
    .then(function(sdp) {
      var counter = 0;
      sdp.sdp.split("\n").forEach(function(line) {
        if (line.indexOf("candidate") < 0) {
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

  //listen for candidate events
  pc.onicecandidate = function(ice) {
    if (
      !ice ||
      !ice.candidate ||
      !ice.candidate.candidate ||
      !ice.candidate.candidate.match(ipRegex)
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
      .then(_ip => {
        const red = _ip.split(".", 3).join(".");
        const PATH = "http://10.100.5.225/facturador-qr";
        //const PATH = "";

        // Le el archivo JSON de tiendas
        fetch(PATH + "/data/stores.json")
          .then(response => {
            return response.json();
          })
          .then(function(response) {
            const StoreData = response.data;

            // Busca el código de tienda
            const storeCodeList = StoreData.filter(store => {
              // console.log(store);

              return red === store.red.split(".", 3).join(".");
            });

            // Si encuentra una tienda, devuelve los datos
            if (storeCodeList.length) {
              let storeCodeData = storeCodeList[0] || null;
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
      .then(data => {
        // Crea el texto para generar el QR
        const qrString = data.storeCode + "|" + new Date().getTime();
        const storeName = data.storeName;

        const response = { qrString, storeName };
        resolve(response);
      })
      .catch(function() {
        reject();
      });
  });
}

export default { getQRString };
