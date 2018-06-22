import ErrorException from '../components/ErrorException';
import Response from '../components/Response';
import LoginForm from '../forms/LoginForm';
import RegisterForm from '../forms/RegisterForm';

module.exports = class Auth {
    static async login(req, res) {
        const form = new LoginForm(req.body);
        try {
            const data = await form.login();
            return new Response(res, data);
        } catch (err) {
            return new ErrorException(res, err.message, 404);
        }
    }

    static async register(req, res) {
        const form = new RegisterForm(req.body);
        try {
            await form.validate();
            const register = await form.register();
            return new Response(res, register);
        } catch (err) {
            return new ErrorException(res, err, 404);
        }
    }
};
