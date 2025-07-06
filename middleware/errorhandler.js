import { constant } from "../utils/constant.js";

const errorhandler = (err, req, res, next) => {
    const statusCode = res.statusCode && res.statusCode !== 200 
        ? res.statusCode 
        : constant.SERVER_ERROR;

    res.status(statusCode);

    let title = "Error";

    switch (statusCode) {
        case constant.VALIDATION_ERROR:
            title = "Validation Failed";
            break;
        case constant.NOT_FOUND:
            title = "Resource Not Found";
            break;
        case constant.FORBIDDEN:
            title = "Forbidden";
            break;
        case constant.UNAUTHORIZED:
            title = "Unauthorized";
            break;
        case constant.SERVER_ERROR:
        default:
            title = "Internal Server Error";
            break;
    }

    res.json({
        title,
        message: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
};

export { errorhandler };
