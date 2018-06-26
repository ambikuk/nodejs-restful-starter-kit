import ErrorException from '../components/ErrorException';
import Response from '../components/Response';
import LoginForm from '../forms/LoginForm';
import RegisterForm from '../forms/RegisterForm';

module.exports = class AuthController {
    static async login(req, res) {
        try {
            const form = new LoginForm(req.body);
            const data = await form.login();
            return new Response(res, data);
        } catch (err) {
            return new ErrorException(res, err.message, 404);
        }
    }

    static async register(req, res) {
        try {
            const form = new RegisterForm(req.body);
            const register = await form.register();
            return new Response(res, register);
        } catch (err) {
            return new ErrorException(res, err.message, 404);
        }
    }
};
