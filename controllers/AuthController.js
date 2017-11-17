import ErrorException from '../components/ErrorException';
import Response from '../components/Response';
import LoginForm from '../forms/LoginForm';
import RegisterForm from '../forms/registerForm';

module.exports = class Auth {

	async login(req, res) {
		const form = new LoginForm(req.body);
		try {
			const data = await form.login();
			return new Response(res, data);
		} catch (err) {
			return new ErrorException(res, err, 404);
		}
		
    };

    async register(req, res) {
		const form = new RegisterForm(req.body);
		try {
			const validate = await form.validate();
			const register = await form.register();
			return new Response(res, register);
		} catch (err) {
			return new ErrorException(res, err, 404);
		}
    }
	
}