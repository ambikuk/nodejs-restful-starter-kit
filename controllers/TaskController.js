import BaseController from './BaseController';
import ErrorException from '../components/ErrorException';
import Response from '../components/Response';
import model from '../models';
import TaskForm from '../forms/TaskForm';

module.exports = class TaskController extends BaseController {

	async create(req, res) {
		req.body.user_id = req.user._id;
		const form = new TaskForm(req.body);
		try {
			const validate = await form.validate();
			const data = await form.save();
			return new Response(res, data);
		} catch (err) {
			return new ErrorException(res, err, 404);
		}
	}

	async update(req, res) {
		req.body.id = req.params.id;
		const form = new TaskForm(req.body);
		try {
			const validate = await form.validate();
			const data = await form.update();
			return new Response(res, data);
		} catch (err) {
			return new ErrorException(res, err, 404);
		}
	}
	
	list(req, res) {
		model.Task.findAll().then(rows => {
			return new Response(res, rows);
		});
	}

	view(req, res) {
		model.Task.findById(req.params.id).then(result => {
			return new Response(res, result);
		});
	}

	delete(req, res) {
		model.Task.destroy({
			where : {
				id : req.params.id
			}
		}).then(result => {
			return result ? new Response(res, result) : new ErrorException(res, result, 404);;
		});
	}


}