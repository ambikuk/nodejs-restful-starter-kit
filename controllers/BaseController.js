import ErrorException from '../components/ErrorException';

export default class BaseContoller {

	loginRequired(req, res, next) {
		if (req.user) {
		    next();
		} else {
			return new ErrorException(res, 'Unauthorized user!', 401);
		}
	}

};