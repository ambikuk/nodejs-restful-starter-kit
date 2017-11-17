import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import model from '../models';

export default class LoginFrom {
	constructor (params) {
		this.params = params;
	}

	login() {
		const params = this.params;
		return new Promise((resolve, reject) => {
			model.User.findOne({
				where: {
					email: params.email
				}
			}).then(data => {
				const hash = data.password_hash;
				// hash = hash.zreplace(/^\$2y(.+)$/i, '\$2a$1');
				bcrypt.compare(params.password, hash, function(err, res) {
					if (res) {
						const login = { token: jwt.sign({ email: data.email, _id: data.id }, 'RESTFULAPIs', { expiresIn: '1d'})};
						resolve(login);
					} else {
						reject('password incorrect')
					}
				});
			});
        });
	}
	

}