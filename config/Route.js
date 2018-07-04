
import Auth from '../controllers/AuthController';
import Task from '../controllers/TaskController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

module.exports = function (app) {
    app.route('/auth/login').post(Auth.login);
    app.route('/auth/register').post(Auth.register);
    app.route('/task').post(AuthMiddleware.loginRequired).post(Task.create);
    app.route('/task').get(Task.list);
    app.route('/task/:id').get(Task.view);
    app.route('/task/:id').put(AuthMiddleware.loginRequired).put(Task.update);
    app.route('/task/:id').delete(AuthMiddleware.loginRequired).delete(Task.delete);
};
