const {
    User
} = require('../models')

const {
    checkPassword
} = require('../helpers/bcrypt')

const {
    tokenGenerate
} = require('../helpers/jwt')
class controller {
    static register(req, res, next) {
        let {
            name,
            email,
            role,
            password
        } = req.body

        User.create({
                name,
                email,
                password,
                role
            })
            .then(result => {
                res.status(201).json({
                    id: result.id,
                    name: result.name,
                    email: result.email,
                    role: result.role
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static login(req, res, next) {
        let {
            email,
            password
        } = req.body
        User.findOne({
            where: {
                email
            }
        }).then(result => {
            let error = {
                name: 'loginValidation',
                status: 400,
                msg: {
                    message: 'Email/Password is wrong'
                }
            }
            if(!result){
                next(error)
            } else if (result.role === 'Customer') {
                next(error)
            } else {
                let login = checkPassword(password, result.password)
                if (login) {
                    let payload = {
                        id: result.id,
                        email: result.email
                    }
                    let token = tokenGenerate(payload)
                    res.status(200).json({
                        'token': token,
                    })
                } else {
                    next(error)
                }
            }
        }).catch(err => {
            next(err)
        })
    }
}

module.exports = controller