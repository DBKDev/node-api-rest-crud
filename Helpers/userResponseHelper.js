function succesResponse(res, code, data, message = null, details = {}) {
    return res.status(code).json({
        code,
        status: "success",
        message,
        details,
        data
    });
};

function errorResponse(res, code, message = null, details = {}) {
    return res.status(code).json({
        code,
        status: "error",
        message,
        details,
        data: null
    });
};


module.exports = {
    succesResponse,
    errorResponse
};