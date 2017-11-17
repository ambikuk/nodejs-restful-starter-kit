import bcrypt from 'bcrypt'
import model from '../models'
import validator from 'jsonschema/lib/validator'

export default class RegisterForm {
	constructor (params) {
		this.params = params;
		this.validate();
	}

	validate() {
		const params = this.params;
		return new Promise((resolve, reject) => {
			const v = new validator();
			const schema = {
			    "id": "/Register",
			    "type": "object",
			    "properties": {
			      "email": {"type": "string"},
			      "password": {"type": "string"}
			    },
			    "required": ["email", "password"]
			};
			
			const errors = [];
			const validate = v.validate(params, schema);	
		  	if (!validate.valid) {
			  	for (let i in validate.errors) {
			  		errors.push(validate.errors[i].stack);
			  	}
				reject(errors);
			}
			resolve();
		});
	}

	register() {
		const params = this.params;
		const self = this;
		return new Promise((resolve, reject) => {
			bcrypt.hash(params.password, 10, function(err, hash) {
				const now = Math.round(+new Date()/1000);
			  	const input = {
					"email" : params.email,
					"password_hash" : hash,
					'created_at' : now,
					'updated_at' : now
				}

				self.checkExistingUser(params.email).then(data => {
					model.User.create(input).then(function(data) {
						resolve(data);
					}).catch(data => { 
						reject(data);
					});
				}).catch( data => { 
					reject(data);
				});
			});
        });
	}

	checkExistingUser(email) {
		return new Promise((resolve, reject) => {

			model.User.findAll({
				where: {
					email: email
				}
			}).then(data => {
				if (data.length === 0) {
					resolve(true);	
				} else {
					reject('email already exist!');
				}
			});
        });
	}
}
