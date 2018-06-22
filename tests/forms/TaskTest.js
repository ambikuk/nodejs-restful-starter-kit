import db from '../../models';
import test from 'ava';
import BaseTest from '../helpers/BaseTest';
import TaskForm from '../../forms/TaskForm';

export default class TaskTest extends BaseTest {
    
    execute() {
        super.prepare();

        test('Add Task', async t => {
            const params = {
                title : "Title 1",
                user_id: 1
            }
        
            const form = new TaskForm(params);
            try {
                const validate = await form.validate();
                const data = await form.save();
                t.pass();
            } catch (err) {
                t.fail();
            }
        });

        test('Update Task', async t => {
            const params = {
                title : "Title 1",
                id : 1,
                user_id: 1
            }
        
            const form = new TaskForm(params);
            try {
                const validate = await form.validate();
                const data = await form.update();
                t.pass();
            } catch (err) {
                t.fail(err);
            }
        });

        
        super.clean();
    }    
}

