import BaseController from './BaseController';
import ErrorException from '../components/ErrorException';
import Response from '../components/Response';
import TaskRepo from '../repositories/task';
import TaskForm from '../forms/TaskForm';

module.exports = class TaskController extends BaseController {
    static async create(req, res) {
        try {
            req.body.user_id = req.user.id;
            const form = new TaskForm(req.body, 'create');
            const data = await form.create();
            return new Response(res, data);
        } catch (err) {
            return new ErrorException(res, err.message, 404);
        }
    }

    static async update(req, res) {
        try {
            const form = new TaskForm(req.body);
            await form.validate();
            const data = await form.update(req.params.id);
            return new Response(res, data);
        } catch (err) {
            return new ErrorException(res, err.message, 404);
        }
    }

    static async list(req, res) {
        const task = await TaskRepo.list();
        return new Response(res, task);
    }

    static async view(req, res) {
        const task = await TaskRepo.findById(req.params.id);
        return new Response(res, task);
    }

    static async delete(req, res) {
        const task = await TaskRepo.delete(req.params.id);
        return new Response(res, task);
    }
};
