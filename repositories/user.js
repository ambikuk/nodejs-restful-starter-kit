import model from '../models';

export default class User {
    static async findByEmail(email) {
        return model.User.findOne({
            where: {
                email
            }
        });
    }

    static async create(data) {
        return model.User.create(data);
    }
}
