import model from '../models';

export default class Task {
    static async list(email) {
        return model.Task.findAll();
    }

    static async findById(id) {
        return model.Task.findById(id);
    }

    static async create(data) {
        return model.Task.create(data);
    }

    static async update(id, data) {
        return model.Task.update(data, {
            where: {
                id
            }
        });
    }

    static async delete(id) {
        return model.Task.destroy({
            where: {
                id
            }
        });
    }
}
