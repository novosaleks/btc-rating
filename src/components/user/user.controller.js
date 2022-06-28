const FileContext = require('../../services/fileStorageService');
const generateToken = require('../../utils/generateToken');
const httpStatus = require('../../constants/httpStatus')
const bcrypt = require('bcryptjs');

const fileContext = new FileContext('users.json', 'email');

const user = (req, res) => {
    const create = async () => {
        const {email, password} = req.body;

        if (!email || !password) {
            res.statusCode = httpStatus.BAD_REQUEST;
            res.json(
                {ok: false, message: 'You must specify email and password!'});
            return;
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            await fileContext.create({
                email,
                password: hashedPassword,
            });

            res.statusCode = httpStatus.CREATED;
            res.json({ok: true, message: 'User has been created'});
        } catch (e) {
            res.statusCode = httpStatus.BAD_REQUEST;
            res.json({ok: false, message: e.message});
        }
    };

    const login = async () => {
        if (req.authToken === 'Verified') {
            res.statusCode = httpStatus.FORBIDDEN;
            res.json({ok: false, message: 'You\'ve already logged in!'});
        } else {
            const {email, password} = req.body;

            if (!email || !password) {
                res.statusCode = httpStatus.BAD_REQUEST;
                res.json({
                    ok: false,
                    message: 'You must specify email and password to log in!',
                });
                return;
            }

            try {
                const user = await fileContext.findOne({
                    email,
                });

                const isCorrectPassword = await bcrypt.compare(password,
                    user.password);

                if (!isCorrectPassword) {
                    throw new Error('Invalid user\'s credentials');
                }

                const token = generateToken({email, password},
                    {expiresIn: '1h'});

                res.statusCode = httpStatus.OK;
                res.cookie('ACCESS_TOKEN', token, {
                    httpOnly: true,
                });
                res.json({ok: true, message: 'Successfully logged in!'});
            } catch (e) {
                res.statusCode = httpStatus.FORBIDDEN;
                res.json({ok: false, message: e.message});
            }
        }
    };

    return {create, login};
};

module.exports = user;
