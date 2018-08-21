const express = require('express')
const router = express.Router();
const ApiResponse = require('../helper/ApiResponse');
const AuthHelper = require('../helper/AuthHelper');
const modelPromise = require('../database/mysql').model;
const UserDTO = require('../dto/UserDTO');
const enumTypes = require('../enum');


class AuthController {
    constructor() {
        this.router = router;
        this.router.post('/login', this.login);
        this.router.post('/register', this.register);
        
    }

    async login(req, res) {
        const username = req.body.username;
        const password = req.body.password;
        const model = await Promise.resolve(modelPromise);

        try {
            let user = await model.user.findOne({
                where: {
                    username
                }
            });

            if(!user) {
                throw "username invalid in database";
            } else {
                AuthHelper.verifyPassword(password, user.passwordHash);
                user = new UserDTO(user).toObject();
                const userResponse = {
                    user,
                    token: AuthHelper.generateToken(user)
                }
                ApiResponse.success(userResponse)(res);
            }
            
        } catch (error) {
            console.log(error);
            ApiResponse.error(error)(res);
        }

        
    }

    async register(req, res) {
        const username = req.body.username;
        const password = req.body.password;
        const admin = req.query.admin;
        const passwordHash = AuthHelper.hashPassword(password);

        const data = {
            username,
            passwordHash,
            role: enumTypes.role.user
        }

        if(admin) {
            data.role = enumTypes.role.admin;
        }

        let user;

        try {
            const model = await Promise.resolve(modelPromise);   
            const existUser = await model.user.findOne({
                where: {
                    username
                }
            })

            if(existUser) {
                throw "user is exist in database";
            } else {
                user = await model.user.create(data);
                user = new UserDTO(user).toObject();
            }

            const userResponse = {
                user,
                token: AuthHelper.generateToken(user)
            }

            ApiResponse.success(userResponse)(res);
        } catch (error) {
            console.log(error);
            ApiResponse.error(error)(res);
        }

        
    }
  
}

module.exports = new AuthController().router;