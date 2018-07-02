export default class Response {
    constructor(res, msg) {
        return res.json(msg);
    }
}
