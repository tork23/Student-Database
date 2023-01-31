const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    college:{
        type: String,
        required: true,
    },
    batch: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    dsa_score:{
        type: String,
        required: true
    },
    webd_score:{
        type: String,
        required: true
    },
    react_score:{
        type: String,
        required: true
    },
    interviews:[
    {
        companyname:{
            type: String,
            required: true
        },
        date:{
            type: Date,
            required: true
        },
        result:{
            type: String,
            enum:[
                "Selected",
                "Not Selected",
                "On Hold",
                "Absent",
                "Interview Pending"
            ],
        },
    },
    ],

},{
    timestamps: true
});


const Student = mongoose.model('Student', studentSchema);

module.exports = Student;