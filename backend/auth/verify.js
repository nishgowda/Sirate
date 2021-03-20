
/* a middleware function that assures the users is
 * authenticatd - add to route handlers */

const isAuthenticated = (req, res, next) => {
    if (req.session.userId !== undefined) {
        next();
    } else {
        console.log(req.session.userId);
        res.status(404).send("Unauthorized");
    }
}

module.exports = isAuthenticated;