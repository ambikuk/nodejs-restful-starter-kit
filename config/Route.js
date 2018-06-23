
import Auth from '../controllers/AuthController';
import User from '../controllers/UserController';
import Task from '../controllers/TaskController';

module.exports = function (app) {
    app.route('/auth/login').post(Auth.login);
    app.route('/auth/register').post(Auth.register);

    app.route('/user/list').get(User.loginRequired).get(User.list);

    app.route('/task/create').post(User.loginRequired).post(Task.create);
    app.route('/task/list').get(User.loginRequired).get(Task.list);
    app.route('/task/view/:id').get(User.loginRequired).get(Task.view);
    app.route('/task/update/:id').post(User.loginRequired).post(Task.update);
    app.route('/task/delete/:id').post(User.loginRequired).post(Task.delete);
};
