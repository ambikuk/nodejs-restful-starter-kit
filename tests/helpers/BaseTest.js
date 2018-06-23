
import test from 'ava';
import db from '../../models';
import AuthenticationTest from '../forms/AuthenticationTest';

export default class BaseTest {
    static async init() {
        test.before(async (t) => {
            await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
            await db.User.destroy({
                truncate: true
            });
            await db.Task.destroy({
                truncate: true
            });
            const user = {
                email: 'buhoridermawan@gmail.com',
                password_hash: '$2y$13$AJ/ZeQNaNEfxB5rdIrZL/OzFUkfF2HvIA8jWUQpjng/iec6dhV0L2',
                created_at: '2017-11-14 05:07:14',
                updated_at: '2017-11-14 05:07:14',
                last_login: '2017-11-14 05:07:14'
            };
            const userRow = await db.User.create(user);

            const task = {
                title: 'Title',
                created_at: '2017-11-14 05:07:14',
                updated_at: '2017-11-14 05:07:14',
                user_id: userRow.id
            };
            await db.Task.create(task);
        });
    }

    static async execute() {
        await this.init();
        await AuthenticationTest.execute();
    }
}
