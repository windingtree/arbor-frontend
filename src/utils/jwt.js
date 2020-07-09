export const createToken = (web3, options) => new Promise((resolve, reject) => {
  const {
    algorithm,
    expiration,
    issuerDidValue,
    audienceDidValue,
    scope,
    from
  } = options;

  // Build the header
  const header = {
    alg: algorithm,
    typ: 'JWT'
  };

  // Using browser's time is dangerous, but used here as a PoC
  const now = Math.floor(new Date().getTime() / 1000);
  const expiry = parseInt(expiration, 10) + now;

  // Create the payload
  const payload = {
    iss: issuerDidValue,
    aud: audienceDidValue,
    exp: expiry,
    scope: scope
  };

  console.log('@@@', payload);

  // Prepare content to sign
  const sHeader = JSON.stringify(header);
  const sPayload = JSON.stringify(payload);

  var toSign = "";
  toSign = btoa(sHeader) + '.' + btoa(sPayload);
  toSign = toSign.replace(/=/g, '');
  toSign = toSign.replace(/\+/g, "-");
  toSign = toSign.replace(/\//g, "_");

  // Handle the Ethereum signature process
  if (algorithm === 'ETH') {

    // Prepare raw transaction data
    
    var params = [toSign, from];
    var method = 'personal_sign';

    // Request request to web3 provider
    web3.currentProvider.send({
        method,
        params,
        from,
      },
      (err, result) => {
        
        if (err) {
          console.error(err);
          reject(err);
          return;
        }

        if (result.error) {
          console.error(result.error);
          reject(result.error);
          return;
        }

        const signature = result.result;
        
        // Convert hex to base64
        // Leading '0x' is skipped, and each byte is unpacked using two hex chars
        var raw = '';

        for (let i = 2; i < signature.length; i += 2) {
          raw += String.fromCharCode(parseInt(signature.substring(i, i + 2), 16))
        }

        const b64Token = btoa(raw).replace(/\+/g, "-").replace(/\//g, "_").split('=')[0]
                
        resolve(toSign + '.' + b64Token);
      });
  } else {
    reject(new Error(`${algorithm} not supported yet`));
    return;
  }
});
