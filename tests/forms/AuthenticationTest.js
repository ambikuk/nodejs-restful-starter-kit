import test from 'ava';
import RegisterForm from '../../forms/RegisterForm';
import LoginForm from '../../forms/LoginForm';

export default class AuthenticationTest {
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

        test('New Register', async (t) => {
            const params = {
                email: 'buhoridermawan+1@gmail.com',
                password: 'nasigoreng',
                password_repeat: 'nasigoreng'
            };

            const form = new RegisterForm(params);
            try {
                const register = await form.register();
                t.is(register.email, params.email);
            } catch (err) {
                t.fail(err);
            }
        });

        test('Email has been registered', async (t) => {
            try {
                const params = {
                    email: 'buhoridermawan@gmail.com',
                    password: 'nasigoreng',
                    password_repeat: 'nasigoreng'
                };
                const form = new RegisterForm(params);
                await form.register();
            } catch (err) {
                t.deepEqual(err.message, 'Email has been registered');
            }
        });

        test('Register form mandaroy', async (t) => {
            try {
                const params = {
                    email: 'buhoridermawan+1@gmail.com',
                    password: 'nasigoreng'
                };
                const form = new RegisterForm(params);
                await form.register();
            } catch (err) {
                t.deepEqual(err.message, 'password_repeat is required');
            }
        });
    }
}

