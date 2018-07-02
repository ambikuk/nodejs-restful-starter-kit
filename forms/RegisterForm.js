import Joi from 'joi';
import Bcrypt from 'bcrypt';
import UserRepo from '../repositories/user';

export default class RegisterForm {
    constructor(params) {
        this.params = params;
        this.validate();
    }

    validate() {
        const { params } = this;
        const schema = Joi.object().keys({
            email: Joi.string().required().max(50),
            password: Joi.string().required().max(50),
            password_repeat: Joi.string().required().max(50)
        });

        const validate = Joi.validate(params, schema);
        if (validate.error !== null) {
            throw Error(validate.error.details[0].message.replace(/"/g, ''));
        }
        if (params.password !== params.password_repeat) {
            throw Error("Password Confirmation didn't match!");
        }
    }

    async register() {
        const { params } = this;
        const hash = await Bcrypt.hash(params.password, 10);
        const now = Math.round(+new Date() / 1000);
        const input = {
            email: params.email,
            password_hash: hash,
            created_at: now,
            updated_at: now
        };

        const data = await UserRepo.findByEmail(params.email);
        if (data) {
            throw Error('Email has been registered');
        }
        return UserRepo.create(input);
    }
}
