import test from 'ava';
import TaskForm from '../../forms/TaskForm';

export default class TaskFormTest {
    static async execute() {
        test('task create', async (t) => {
            try {
                const params = {
                    title: 'Title',
                    user_id: 1
                };
                const form = new TaskForm(params, 'create');
                const data = await form.create();
                t.deepEqual(data.title, params.title);
            } catch (err) {
                t.fail(err);
            }
        });

        test('task update', async (t) => {
            try {
                const params = {
                    title: 'Change Title'
                };
                const form = new TaskForm(params);
                const data = await form.update(1);
                t.deepEqual(data, [1]);
            } catch (err) {
                t.fail(err);
            }
        });

        test('task validation', async (t) => {
            try {
                const params = {};
                const form = new TaskForm(params);
                await form.update(1);
            } catch (err) {
                t.deepEqual(err.message, 'title is required');
            }
        });
    }
}

