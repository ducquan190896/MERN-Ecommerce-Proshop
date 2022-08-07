export const errorhandler = async (err, req, res, next) => {
    const statuscode = res.statusCode === 200 ? 500 : res.statusCode
    console.log(err)
    res.status(statuscode).json({
        message: err.message
    })
}

export const notFound = async ( req, res, next) => {
    const error = new Error(`${req.originalUrl} not found`)
    res.status(404)
    next(error)
}