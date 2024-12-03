const error_handler = (error, req, res, next) => { 
    const statusCode = req.statusCode === 200 ? 500 : res.statusCode; 
    return res.status(statusCode).json({
        success: false,
        msg: error.message,
    })
}

const not_found = (req, res, next) => {  
    const error = new Error(`Route ${req.method} ${req.originalUrl} not found.`)
    res.status(404)
    next(error)
}

const throwErrorWithStatus = (code, message, res, next) => {  
    const formatMessage = message?.replaceAll(`\'`, '');
    const error = new Error(formatMessage);
    res.status(code);
    next(error);
}
module.exports = {
    error_handler,
    not_found,
    throwErrorWithStatus
}