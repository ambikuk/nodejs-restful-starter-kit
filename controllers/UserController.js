import BaseController from './BaseController';
import Response from '../components/Response';
import model from '../models';

module.exports = class UserController extends BaseController {
    static list(req, res) {
        model.User.findAll().then(rows => new Response(res, rows));
    }
};
