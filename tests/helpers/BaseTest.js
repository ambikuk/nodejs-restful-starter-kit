
import test from 'ava';
import db from '../../models';
import LoginFormTest from '../forms/LoginFormTest';
import RegisterFormTest from '../forms/RegisterFormTest';
import TaskFormTest from '../forms/TaskFormTest';
import TaskRepoTest from '../repositories/taskTest';

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
                id: 1,
                email: 'buhoridermawan@gmail.com',
                password_hash: '$2y$13$AJ/ZeQNaNEfxB5rdIrZL/OzFUkfF2HvIA8jWUQpjng/iec6dhV0L2',
                created_at: '2017-11-14 05:07:14',
                updated_at: '2017-11-14 05:07:14',
                last_login: '2017-11-14 05:07:14'
            };
            const userRow = await db.User.create(user);

            await db.Task.create({
                id: 1,
                title: 'Title',
                created_at: '2017-11-14 05:07:14',
                updated_at: '2017-11-14 05:07:14',
                user_id: userRow.id
            });
            await db.Task.create({
                id: 2,
                title: 'Title 2',
                created_at: '2017-11-14 05:07:14',
                updated_at: '2017-11-14 05:07:14',
                user_id: userRow.id
            });
        });
    }

    static async execute() {
        await this.init();
        await LoginFormTest.execute();
        await RegisterFormTest.execute();
        await TaskFormTest.execute();
        await TaskRepoTest.execute();
    }
}
