import bcrypt from 'bcrypt'
import model from '../models'
import validator from 'jsonschema/lib/validator'

export default class TaskForm {
	constructor (params, scenario = 'default') {
        this.params = params;
        this._scenario = scenario;
    }
    
    set scenario  (scenario)  { this._scenario = scenario }

	validate() {
		const params = this.params;
		return new Promise((resolve, reject) => {
			const v = new validator();
			const schema = {
			    "id": "/Task",
			    "type": "object",
			    "properties": {
			      "title": {"type": "string"},
			    },
			    "required": ["title"]
			};
			
			const errors = [];
			const validate = v.validate(params, schema);	
		  	if (!validate.valid) {
			  	for (let i in validate.errors) {
			  		errors.push(validate.errors[i].stack);
			  	}
			}
			
            if (errors.length > 0) {
                reject(errors);
			}
			
			resolve();
		});
	}

	save() {
		const params = this.params;
		return new Promise((resolve, reject) => {
			const input = {
                "title" : params.title,
                "user_id":  params.user_id
			}

            model.Task.create(input).then(function(data) {
                resolve(data);
            }).catch(data => { 
                reject(data);
            });            
        });
	}
	
	update() {
		const params = this.params;
		return new Promise((resolve, reject) => {
			model.Task.update({
                "title" : params.title,
			}, {
				where: {
					"id" : params.id
				}
			}).then(function(data) {
				(data && data[0] == 1) ? resolve(params) : reject()
            }).catch(data => { 
                reject(data);
            });            
        });
	}
}
