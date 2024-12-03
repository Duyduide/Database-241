const asyncHandler = require('express-async-handler');
const db = require('../models');
const { throwErrorWithStatus } = require('../middleware/error_handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    register: asyncHandler(async (req, res) => {
        const {email, name, password} = req.body;
        const response = await db.User.findOrCreate({
            where: { email: email },
            defaults: req.body
        })
        return res.json({
            success: response[1],
            mes: response[1] ? 'User registered successfully' : 'User already exists'
        });
    }),
    

    login: asyncHandler(async (req, res, next) => {
        const {email, password} = req.body;
        const user = await db.User.findOne({where: {email: email}});
        if(!user) throwErrorWithStatus(401, 'User have not registered', res, next);
        const isMatchingPassword = bcrypt.compareSync(password, user.password);
        if(!isMatchingPassword) throwErrorWithStatus(401, 'Invalid password', res, next);
        const token = jwt.sign({uid: user.id, role: user.role}, process.env.JWT_SECRET, { expiresIn: '7d' } )
        return res.json({
            status: true,
            message: 'Login successful',
            accessToken: token
        });
            
    }),    
}




