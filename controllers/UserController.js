import BaseController from './BaseController';
import ErrorException from '../components/ErrorException';
import Response from '../components/Response';
import model from '../models';

module.exports = class UserController extends BaseController {

	list(req, res) {
		model.User.findAll().then(rows => {
			return new Response(res, rows);
		});
	}

}