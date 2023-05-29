// Error Handler Class
class ErrorHandler extends Error {
    constructor(message, errorcode) {
        super(message);
        this.statuscode = statuscode
        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = ErrorHandler