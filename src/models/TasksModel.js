const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        default: 'New',
        required: true,
        enum: [
            "New",
            "Processing",
            "Completed",
            "Cancelled"
        ]
    },
    email: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
},{
    versionKey: false
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
