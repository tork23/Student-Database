var Student = require('../models/student');

// Render a page for adding a new student
module.exports.addStudent = function(req, res){
    if (req.isAuthenticated()) {
        return res.render('add_student',{
            title:'Add Student'
        });
    }
    return res.redirect('/users/sign-in')
}

// Create a new student
module.exports.createStudent = async function (req, res) {
  try{
    let student = await Student.create({
        name: req.body.name,
        last_name: req.body.last_name,
        email: req.body.email,
        college: req.body.college,
        batch: req.body.batch,
        status: req.body.status,
        dsa_score: req.body.dsa_score,
        webd_score: req.body.webd_score,
        react_score: req.body.react_score
    });
    
    if (req.xhr){
        // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
        student = await student.populate('user', 'name');

        return res.status(200).json({
            data: {
                student: student
            },
            message: "Student created!"
        });
    }

    req.flash('success', 'Student created!');
    return res.redirect('/student/student_list');

}catch(err){
    req.flash('error', err);
    // added this to view the error on console as well
    console.log(err);
    return res.redirect('back');
}
};

// View the list of the students
module.exports.studentList = async (req, res) => {
    try {
      const students = await Student.find({})
      return res.render('student_list', {
        title: 'Student List',
        students,
      })
    } catch (err) {
      console.log('error while fetching all the interviews from the DB!', err)
      return res.status(500).json({
        message: 'error while fetching all the interviews from the DB!',
      })
    }
  }