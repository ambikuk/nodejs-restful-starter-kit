import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import model from '../models';

export default class LoginFrom {
    constructor(params) {
        this.params = params;
    }

    login() {
        const { params } = this;
        return new Promise((resolve, reject) => {
            model.User.findOne({
                where: {
                    email: params.email
                }
            }).then((data) => {
                let hash = data.password_hash;
                hash = hash.replace(/^\$2y(.+)$/i, '$2a$1'); // Support YII2 encryption
                bcrypt.compare(params.password, hash, (err, res) => {
                    if (res) {
                        const login = { token: jwt.sign({ email: data.email, _id: data.id }, 'RESTFULAPIs', { expiresIn: '1d' }) };
                        resolve(login);
                    } else {
                        reject(new Error('Password Incorrect'));
                    }
                });
            });
        });
    }
}
