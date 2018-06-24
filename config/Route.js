
import Auth from '../controllers/AuthController';
import Task from '../controllers/TaskController';

module.exports = function (app) {
    app.route('/auth/login').post(Auth.login);
    app.route('/auth/register').post(Auth.register);
    app.route('/task').post(Auth.loginRequired).post(Task.create);
    app.route('/task').get(Task.list);
    app.route('/task/:id').get(Task.view);
    app.route('/task/:id').put(Auth.loginRequired).put(Task.update);
    app.route('/task/:id').delete(Auth.loginRequired).delete(Task.delete);
};
