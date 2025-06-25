class ApiErrorHandler extends Error{
    constructor(success, message, status){
        super();
        this.success = success;
        this.message = message;
        this.statusCode = status
    }
}

export default ApiErrorHandler;