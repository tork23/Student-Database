const Student = require('../models/student')
const Interview = require('../models/interview');


// For scheduling interview after click on allocate
module.exports.scheduleInterview = async function(req,res){
  try{
    let interview = await Interview.findById(req.params.id).populate({
        path:'list_of_students.student',
        model:'Student'
    });
    console.log(interview.path);
    let student = await Student.find({});

    return res.render('allocation',{
        title:'Allocate Students',
        interview:interview,
        student:student
    });
}catch(err){
    console.log('*** Error in Scheduling the interview controller ***',err);
    return res.redirect('back');
}
  
}

//For Adding the students and schedule the interview
module.exports.addStudent = async function(req,res){
    try{
        let schInterview = await Interview.findById(req.params.id).populate({
            path:'list_of_students.student',
            model:'Student'
        });
        console.log(schInterview);
        if(schInterview){
            let student =  schInterview.list_of_students;
            for(let i=0;i<student.length;i++){
                if(student[i].student == req.body.student){
                    console.log('Already Scheduled on the same date');
                    return res.redirect('back');
                }
            }
        }
        await schInterview.list_of_students.push({
            student:req.body.student
        });
        await schInterview.save();
        return res.redirect('back');
    }catch(err){
        console.log('*** Error in adding to interview student controller ***',err);
        return res.redirect('back');
    }
}

//controller for updating the result
module.exports.updateResult = async function(req,res){
    try{
        let schInterview = await Interview.findById(req.params.id).populate({
            path:'list_of_students',
            model:'Student'
        });
        let studentID = req.body.student;
        
        if(schInterview){
            let stid = schInterview.list_of_students;
        
            for(let i=0;i<stid.length;i++){
                
                if(stid[i].student==studentID){
                    
                    stid[i].result = req.body.result;
                    schInterview.save();
                    return res.redirect('back');
                }
            }
        }
        return res.redirect('back');
    }catch(err){
        console.log('*** Error in updating to interview result controller ***',err);
        return res.redirect('back');
    }
}