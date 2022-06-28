const fetch = require('node-fetch');

module.exports = class BtcService {
    #url = 'https://api.coindesk.com/v1/bpi/currentprice/UAH.json';

    async #fetchData() {
        const req = await fetch(this.#url);

        if (!req.ok) {
            throw new Error(
                `Request on ${req.url} failed with code ${req.statusCode}`);
        }

        return await req.json();
    }

    static transformData(data) {
        return {
            updatedAt: data.time.updated,
            rate: data.bpi.UAH.rate_float,
        };
    }

    async getData() {
        const data = await this.#fetchData();

        return BtcService.transformData(data);
    }
};
