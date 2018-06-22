import RegisterForm from '../../forms/RegisterForm';
import LoginForm from '../../forms/LoginForm';
import db from '../../models';
import test from 'ava';
import BaseTest from '../helpers/BaseTest';

export default class AuthenticationTest extends BaseTest {
    
    execute() {
        super.prepare();

        test('Login', async t => {
            const params = {
                email : "buhoridermawan@gmail.com",
                password: "bandoeng"
            }
        
            const form = new LoginForm(params);
            try {
                const data = await form.login();
                t.true("token" in data);
            } catch (err) {
                t.fail();
            }
        });
        
        test('New Register', async t => {
            const params = {
                email : "buhoridermawan+1@gmail.com",
                password: "bandoeng"
            }
        
            const form = new RegisterForm(params);
            try {
                const validate = await form.validate();
                const register = await form.register();
                t.is(register.email, params.email);
            } catch (err) {
                t.fail();
            }
        });
        
        test('Registration Exist', async t => {
            const params = {
                email : "buhoridermawan@gmail.com",
                password: "bandoeng"
            }
        
            const form = new RegisterForm(params);
            try {
                const validate = await form.validate();
                const register = await form.register();
                t.fail();
            } catch (err) {
                t.is(err, 'email already exist!');
            }
        });

        
        super.clean();
    }    
}

