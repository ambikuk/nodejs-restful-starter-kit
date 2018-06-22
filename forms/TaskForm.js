import Validator from 'jsonschema/lib/validator';
import model from '../models';

export default class TaskForm {
    constructor(params, scenario = 'default') {
        this.params = params;
        this._scenario = scenario;
    }

    set scenario(scenario) { this._scenario = scenario; }

    validate() {
        const { params } = this;
        return new Promise((resolve, reject) => {
            const v = new Validator();
            const schema = {
                id: '/Task',
                type: 'object',
                properties: {
                    title: { type: 'string' }
                },
                required: ['title']
            };

            const errors = [];
            const validate = v.validate(params, schema);
            if (!validate.valid) {
                Object.keys(validate.errors).forEach(i => errors.push(validate.errors[i].stack));
                reject(errors);
            }
            resolve();

            if (errors.length > 0) {
                reject(errors);
            }

            resolve();
        });
    }

    save() {
        const { params } = this;
        return new Promise((resolve, reject) => {
            const input = {
                title: params.title,
                user_id: params.user_id
            };

            model.Task.create(input).then((data) => {
                resolve(data);
            }).catch((data) => {
                reject(data);
            });
        });
    }

    update() {
        const { params } = this;
        return new Promise((resolve, reject) => {
            model.Task.update({
                title: params.title
            }, {
                where: {
                    id: params.id
                }
            }).then((data) => {
                if (data && data[0] === 1) resolve(params);
                reject();
            }).catch((data) => {
                reject(data);
            });
        });
    }
}
