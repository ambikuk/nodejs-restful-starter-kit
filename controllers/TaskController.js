import BaseController from './BaseController';
import ErrorException from '../components/ErrorException';
import Response from '../components/Response';
import model from '../models';
import TaskForm from '../forms/TaskForm';

module.exports = class TaskController extends BaseController {
    static async create(req, res) {
        req.body.user_id = req.user.id;
        const form = new TaskForm(req.body);
        try {
            await form.validate();
            const data = await form.save();
            return new Response(res, data);
        } catch (err) {
            return new ErrorException(res, err, 404);
        }
    }

    static async update(req, res) {
        req.body.id = req.params.id;
        const form = new TaskForm(req.body);
        try {
            await form.validate();
            const data = await form.update();
            return new Response(res, data);
        } catch (err) {
            return new ErrorException(res, err, 404);
        }
    }

    static list(req, res) {
        model.Task.findAll().then(rows => new Response(res, rows));
    }

    static view(req, res) {
        model.Task.findById(req.params.id).then(result => new Response(res, result));
    }

    static delete(req, res) {
        model.Task.destroy({
            where: {
                id: req.params.id
            }
        }).then(result => (result ? new Response(res, result) : new ErrorException(res, result, 404)));
    }
};
