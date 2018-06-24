import ErrorException from '../components/ErrorException';

export default class BaseContoller {
    static loginRequired(req, res, next) {
        if (!req.user) {
            return new ErrorException(res, 'Unauthorized user!', 401);
        }
        return next();
    }
}
