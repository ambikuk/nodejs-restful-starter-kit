import Bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import Joi from 'joi';
import UserRepo from '../repositories/user';

export default class LoginFrom {
    constructor(params) {
        this.params = params;
        this.validate();
    }

    validate() {
        const { params } = this;
        const schema = Joi.object().keys({
            email: Joi.string().required().max(50),
            password: Joi.string().required().max(50)
        });

        const validate = Joi.validate(params, schema);
        if (validate.error !== null) {
            throw Error(validate.error.details[0].message.replace(/"/g, ''));
        }
    }

    async login() {
        const { params } = this;
        const data = await UserRepo.findByEmail(params.email);
        const hash = data.password_hash.replace(/^\$2y(.+)$/i, '$2a$1'); // Support YII2 encryption
        const result = await Bcrypt.compare(params.password, hash);
        if (!result) {
            throw Error('Incorrect Password');
        }
        return { token: Jwt.sign({ email: data.email, id: data.id }, 'RESTFULAPIs', { expiresIn: '1d' }) };
    }
}
