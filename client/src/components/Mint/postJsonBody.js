const axios = require('axios');

export const postJSONBody = async (api, secret, tokenIdToAffect, imageURL) => {
    const JSONBody = {
      name: ' #' + tokenIdToAffect,
      image:imageURL, 
      attributes:'test'
    };
    const params = {
      headers: {
        'pinata_api_key': api,
        'pinata_secret_api_key': secret
      }
    };
  
    const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
    return axios.post(url, JSONBody, params)
      .catch((err) => {
        console.log(err)
      });
  }