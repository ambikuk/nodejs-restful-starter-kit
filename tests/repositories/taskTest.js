import test from 'ava';
import TaskRepo from '../../repositories/task';

export default class LoginFormTest {
    static async execute() {
        test('task list', async (t) => {
            try {
                const data = await TaskRepo.list();
                t.deepEqual(data[0].title, 'Title');
            } catch (err) {
                t.fail(err);
            }
        });

        test('task detil by id', async (t) => {
            try {
                const data = await TaskRepo.findById(1);
                t.deepEqual(data.title, 'Title');
            } catch (err) {
                t.fail(err);
            }
        });

        test('task delete by id', async (t) => {
            try {
                const data = await TaskRepo.delete(2);
                t.deepEqual(data, 1);
            } catch (err) {
                t.fail(err);
            }
        });
    }
}

