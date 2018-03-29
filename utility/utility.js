
var routeAuth = (roles)=>{

    let notAuthorized = new Error("Not Authorized");
    notAuthorized.status = 401;

    let forbidden = new Error("Forbidden");
    forbidden.status = 403;

    return (req, res, next)=>{

        let user = req.user;

        if(!user)
            return next(notAuthorized);

        if(roles === 'all' || roles.lastIndexOf(user.role) != -1 )
            return next()

        return next(forbidden);

    }

}

module.exports = {
    routeAuth : routeAuth
}
