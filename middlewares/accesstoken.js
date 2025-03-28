module.exports = accesstoken = async (req, res, next) => {
    try {
        const token = "1"
        const incomingToken = req.headers["my-token"];

        if (!Object.keys(req.headers).includes('my-token')) {
            return res.status(401).send("no access!");
        }

        if (!incomingToken) {
            return res.status(401).send("no access!");
        }

        if (incomingToken !== token) {
            return res.status(401).send("no access!");
        }

        next()
    } catch (error) {
        console.log(error)
    }
}
