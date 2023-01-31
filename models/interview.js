const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    company_name:{
        type: String,
        required: true
    },
    interview_date:{
        type: String,
        required: true
    },
    list_of_students:[{
        student:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
        },
        result:{
            type: String,
            enum: ["PASS", "FAIL", "On Hold", "Didn’t Attempt"],
        },
    }],
    
},
{
    timestamps: true
});

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;