const axios = require('axios');


 const get_current_rate =  () => {
     return new Promise((resolve, reject) => {
         
        axios.get('https://bitpay.com/api/rates')
        .then( ({ data } ) => {
           const usdCoin = data.find(coin => coin.name === 'US Dollar');
           
           if (usdCoin) {
               resolve(usdCoin.rate);
           }

           resolve();
        })
        .catch(error => {
            console.log(error);
            reject(error);
        })
     })
}

module.exports = {get_current_rate};