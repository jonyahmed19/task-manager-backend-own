const UserModel = require('../models/UsersModel');
const jwt = require('jsonwebtoken');



exports.registration = async (req, res)=>{

    try{
        const reqBody = req.body;
        const result = await UserModel.create(reqBody);

        if(result){
            result.password = undefined;
            res.status(201).json({
                status: 'success',
                data: result
            })
        }

    }catch (err){
        res.status(401).json({
            status: 'fail',
            data: err
        })
    }

}
exports.login = async (req, res)=>{

    try{
        const reqBody = req.body;

       const result = await UserModel.aggregate([
                {$match: reqBody},
                {$project: {_id:0, email: 1, firstName: 1, lastName: 1, mobile: 1, photo: 1}}
            ]);




        if(result){
            const payload = {exp: Math.floor(Date.now()/1000) + (24*60*60), data: result[0].email}
            const token = jwt.sign(payload, process.env.JWT_SECRET);
            res.status(200).json({
                status: "success",
                token: token,
                data: result
            })

        }

    }catch (err){
        res.status(401).json({
            status: 'fail',
            data: err
        })
    }
}
exports.update = async (req, res)=>{
    try{
        const reqBody = req.body;
        const email = req.headers.email;

        console.log(email)

       const result = await UserModel.updateOne(
           {email}, {$set: reqBody}
       )
        if(result){
            res.status(200).json({
                status: "success",
                data: result
            })
        }

    }catch (err){
        res.status(401).json({
            status: 'fail',
            data: err
        })
    }
}