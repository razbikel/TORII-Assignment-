const { get_current_rate } = require('./handlers/get_rate');
const { store_rate } = require('./handlers/store_rate');

let LOST_VALUES = [];
const INTERVAL = 1000 * 60;


const handle_lost_values = () => {
    return new Promise((resolve, reject) => {
        if ( LOST_VALUES.length !== 0 ){
            Promise.all(LOST_VALUES.map(data => {
                return store_rate(data.rate, data.time)
            }))
            .then(res => {
                LOST_VALUES = res.filter((status => {
                    return status !== 200
                }))
                resolve();
            })
            .catch(error => {
                console.log(error);
                reject(error);
            })
        }
        else {
            resolve();
        }
    })
}


setInterval(async () => {
    await handle_lost_values();
    const current_rate = await get_current_rate();
    const status = await store_rate(current_rate, new Date().toISOString());
    if (!status || status !== 200){
        LOST_VALUES.push({ time, rate });
    }
}, INTERVAL);

