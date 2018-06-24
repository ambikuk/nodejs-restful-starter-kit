import test from 'ava';
import RegisterForm from '../../forms/RegisterForm';

export default class RegisterFormTest {
    static async execute() {
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

