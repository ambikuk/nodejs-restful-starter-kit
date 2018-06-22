import Validator from 'jsonschema/lib/validator';
import bcrypt from 'bcrypt';
import model from '../models';

export default class RegisterForm {
    constructor(params) {
        this.params = params;
        this.validate();
    }

    validate() {
        const { params } = this;
        return new Promise((resolve, reject) => {
            const v = new Validator();
            const schema = {
                id: '/Register',
                type: 'object',
                properties: {
                    email: { type: 'string' },
                    password: { type: 'string' }
                },
                required: ['email', 'password']
            };

            const errors = [];
            const validate = v.validate(params, schema);
            if (!validate.valid) {
                Object.keys(validate.errors).forEach(i => errors.push(validate.errors[i].stack));
                reject(errors);
            }
            resolve();
        });
    }

    register() {
        const { params } = this;
        const self = this;
        return new Promise((resolve, reject) => {
            bcrypt.hash(params.password, 10, (err, hash) => {
                const now = Math.round(+new Date() / 1000);
                const input = {
                    email: params.email,
                    password_hash: hash,
                    created_at: now,
                    updated_at: now
                };

                self.checkExistingUser(params.email).then((data) => {
                    model.User.create(input).then((res) => {
                        resolve(res);
                    }).catch((res) => {
                        reject(res);
                    });
                }).catch((data) => {
                    reject(data);
                });
            });
        });
    }

    static checkExistingUser(email) {
        return new Promise((resolve, reject) => {
            model.User.findAll({
                where: {
                    email
                }
            }).then((data) => {
                if (data.length === 0) {
                    resolve(true);
                } else {
                    reject(new Error('email already exist!'));
                }
            });
        });
    }
}
