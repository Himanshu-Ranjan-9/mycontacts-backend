const errorhandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.json({
        message: err.message,
        stackTrack: process.env.NODE_ENV === "development" ? err.stack : null
    })
}

export { errorhandler }