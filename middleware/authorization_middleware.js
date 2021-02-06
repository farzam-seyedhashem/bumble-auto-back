import RoleModel from '../models/role_model'

export default function permit(...modelName) {
    return async (request, response, next) => {
        const {user, method} = request
        var type = method.toLowerCase();
        if (type === 'get' && Object.keys(request.params).length !== 0) {
            type = 'show'
        }
        console.log(await RoleModel.checkAccess(user.role._id, modelName, type))
        if (user && user.role && user.role._id && await RoleModel.checkAccess(user.role._id, modelName, type)) {
            next();
        } else {
            console.log(RoleModel.checkAccess(user.role._id, modelName, type))
            response.status(403).send({message: "Forbidden"}); // user is forbidden
        }
    }
}
