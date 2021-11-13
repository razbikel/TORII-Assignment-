const { URL, BASE_ID, TABLE_ID, API_KEY } = require('../api_params');
const axios = require('axios');


const store_rate = (rate, time) => {
    return new Promise(async (resolve, reject) => {

        const request_url = `${URL}/${BASE_ID}/${TABLE_ID}`;

        const body = {
            fields:{
                "Time": `${time}`,
                "Rates": `${rate}`
            },
            "typecast": true 
        };

        axios.post(request_url, body, {
            headers:{
                'Authorization': `Bearer ${API_KEY}`
            }
        } )
        .then(res => {
            console.log(`store rate ${rate && rate.toString()} in time ${time}`);
            resolve(res.status)
        })
        .catch(error => {
            console.log(error);
            reject(error);
        })
    })
}

module.exports = {store_rate};