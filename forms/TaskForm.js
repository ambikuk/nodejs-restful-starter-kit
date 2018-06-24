import Joi from 'joi';
import TaskRepo from '../repositories/task';

const CREATE = 'create';
export default class TaskForm {
    constructor(params, scenario = 'default') {
        this.params = params;
        this.scenario = scenario;
        this.validate();
    }

    validate() {
        const { params, scenario } = this;
        const field = {
            title: Joi.string().required().max(50)
        };
        if (scenario === CREATE) {
            field.user_id = Joi.number().required().max(50);
        }
        const schema = Joi.object().keys(field);

        const validate = Joi.validate(params, schema);
        if (validate.error !== null) {
            throw Error(validate.error.details[0].message.replace(/"/g, ''));
        }
    }

    async create() {
        const { params } = this;
        const now = Math.round(+new Date() / 1000);
        const input = {
            title: params.title,
            user_id: params.user_id,
            created_at: now,
            updated_at: now
        };

        return TaskRepo.create(input);
    }

    async update(id) {
        const { params } = this;
        const now = Math.round(+new Date() / 1000);
        const input = {
            title: params.title,
            updated_at: now
        };

        return TaskRepo.update(id, input);
    }
}
