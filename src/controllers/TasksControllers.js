const TaskModel = require('../models/TasksModel');

exports.createTask = async (req, res) =>{
    try{
        let reqBody = req.body;
        reqBody.email = req.headers.email;

        const result = await TaskModel.create(reqBody);
        if(result){
            res.status(201).json({
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
exports.readTasks = async (req, res) =>{
    try{

        const email = req.headers.email;

        const result = await TaskModel.find({email});
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
exports.tasksByStatus = async (req, res) =>{
    try{

        const email = req.headers.email;
        const status = req.params.status;


        const result = await TaskModel.aggregate([
            {$match: {status, email}},
            {$project: {
                    _id: 1, title: 1, description: 1, status: 1,
                    createdDate: {
                        $dateToString: {
                            date: "$createdDate",
                            format: "%d-%m-%Y"
                        }
                    }
                }
            }
        ]);

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
exports.tasksCountOnStatus = async (req, res) =>{
    try{

        const email = req.headers.email;

        const result = await TaskModel.aggregate([
            {$match: { email}},
            {$group: {_id: "$status", sum: {$count: {}}}}
        ]);

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
exports.updateTaskStatus = async (req, res) =>{
    try{

        const email = req.headers.email;
        const id = req.params.id;
        const status = req.params.status;


        const result = await TaskModel.updateOne({
            email: email,
            _id: id
        }, {
            status: status
        })

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
exports.updateTaskText = async (req, res) =>{
    try{

        const email = req.headers.email;
        const id = req.params.id;

        console.log(req.body)





        const result = await TaskModel.updateOne({
            email: email,
            _id: id
        }, req.body )

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
exports.deleteTask = async (req, res) =>{
    try{

        const email = req.headers.email;
        const id = req.params.id;


        const result = await TaskModel.deleteOne({
            email: email, _id: id
        })

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


