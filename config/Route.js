
import Auth from '../controllers/AuthController';
import UserController from '../controllers/UserController';
import TaskController from '../controllers/TaskController';

module.exports = function (app) {
    // const auth = new AuthController(app);
    const user = new UserController(app);
    const task = new TaskController(app);

    app.route('/auth/login').post(Auth.login);
    app.route('/auth/register').post(Auth.register);

    app.route('/user/list').get(user.loginRequired).get(user.list);

    app.route('/task/create').post(user.loginRequired).post(task.create);
    app.route('/task/list').get(user.loginRequired).get(task.list);
    app.route('/task/view/:id').get(user.loginRequired).get(task.view);
    app.route('/task/update/:id').post(user.loginRequired).post(task.update);
    app.route('/task/delete/:id').post(user.loginRequired).post(task.delete);
};
