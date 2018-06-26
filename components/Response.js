export default class Response {
    constructor(res, msg, code = 200) {
        return res.status(code).json(msg);
    }
}
