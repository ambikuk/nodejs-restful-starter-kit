import ErrorException from '../components/ErrorException';

export default class BaseContoller {
    static loginRequired(req, res, next) {
        if (req.user) {
            next();
        }
        return new ErrorException(res, 'Unauthorized user!', 401);
    }
}
