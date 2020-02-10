module.exports = (req, res, next) => {
    if (!req.user){
        return res.status(401).send({error: 'You must log in'});
    }
    if (!req.user.isAdmin){
        return res.status(403).send({error: 'You do not have admin access'});
    }


    next();
};