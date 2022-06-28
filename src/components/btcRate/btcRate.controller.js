const BtcService = require('../../services/btcRateService');
const httpStatus = require('../../constants/httpStatus')

const btcService = new BtcService();

const btcRate = (req, res) => {
    const getRate = async () => {
        try {
            const data = await btcService.getData();

            res.statusCode = httpStatus.OK;
            res.json({ok: true, message: 'Successfully loaded', payload: data});
        } catch (e) {
            res.statusCode = httpStatus.BAD_REQUEST;
            res.json({ok: false, message: e.message});
        }
    };

    return {getRate};
};

module.exports = btcRate;
