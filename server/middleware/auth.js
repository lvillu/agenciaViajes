function auth(req, res, next) {
    if (req.user?._id) return next()

    return res.sendStatus(401);

}


module.exports = auth