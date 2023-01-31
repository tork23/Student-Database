const Interview = require('../models/interview');

// Render a page for adding a new interview
module.exports.addInterview = function(req, res){
    if (req.isAuthenticated()) {
        return res.render('add_interview', {
          title: 'Add Interview',
        })
    }
    return res.redirect('/users/sign-in')
}

// Create a new Interview
module.exports.createInterview = async function(req, res){
  try{
      if (!req.body.company_name && !req.body.interview_date) {
        req.flash('error', 'Please Fill Required Fields');
        return res.redirect('back');
      }
      let interview = await Interview.create({
          company_name: req.body.company_name,
          interview_date: req.body.interview_date
      });
      
      if (req.xhr){
          // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
          interview = await interview.populate('user', 'name');

          return res.status(200).json({
              data: {
                  interview: interview
              },
              message: "Interview created!"
          });
      }

      req.flash('success', 'Interview created!');
      return res.redirect('/interview/interview_list');

  }catch(err){
      req.flash('error', err);
      // added this to view the error on console as well
      console.log(err);
      return res.redirect('back');
  }

}

// View the list of the Interviews
module.exports.interviewList = async (req, res) => {
  try {
    const interviews = await Interview.find({})
    return res.render('interview_list', {
      title: 'Interview List',
      interviews,
    })
  } catch (err) {
    console.log('error while fetching all the interviews from the DB!', err)
    return res.status(500).json({
      message: 'error while fetching all the interviews from the DB!',
    })
  }
}

