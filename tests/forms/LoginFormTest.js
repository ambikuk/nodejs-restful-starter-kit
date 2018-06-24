import test from 'ava';
import LoginForm from '../../forms/LoginForm';

export default class LoginFormTest {
    static async execute() {
        test('Login', async (t) => {
            try {
                const params = {
                    email: 'buhoridermawan@gmail.com',
                    password: 'nasigoreng'
                };
                const form = new LoginForm(params);
                const data = await form.login();
                t.true('token' in data);
            } catch (err) {
                t.fail(err);
            }
        });

        test('Login incorrect password', async (t) => {
            try {
                const params = {
                    email: 'buhoridermawan@gmail.com',
                    password: 'wrong'
                };
                const form = new LoginForm(params);
                await form.login();
            } catch (err) {
                t.deepEqual(err.message, 'Incorrect Password');
            }
        });

        test('Login form mandatory', async (t) => {
            try {
                const params = {
                    email: 'buhoridermawan@gmail.com'
                };
                const form = new LoginForm(params);
                await form.login();
            } catch (err) {
                t.deepEqual(err.message, 'password is required');
            }
        });
    }
}

