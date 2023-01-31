const Student = require('../models/student');
const Interview = require('../models/interview');
const {Parser} = require('json2csv');

module.exports.downloadCSV = async function(req,res){
    try{
        let interview = await Interview.find({}).populate({
            path:'list_of_students.student',
            model:'Student',
        })
        
        let students = await Student.find({});

        //Convert Data to json
        let exportData = [];

        for(i of interview){
            for(s of i.list_of_students){
                let obj ={};

                obj['Name'] = s.student.name;
                obj['Last Name'] = s.student.last_name;
                obj['College'] = s.student.college;
                obj['Status'] = s.student.status;
                obj['DSA Score'] = s.student.dsa_score;
                obj['Webd Score'] = s.student.webd_score;
                obj['React Score'] = s.student.react_score;
                obj['Date'] = i.interview_date;
                obj['Company'] = i.company_name;
                obj['Result']=s.result;
                exportData.push(obj);
            }
        }

        const fields = ['Name','Last Name','College','Status','DSA Score','Webd Score',
                        'React Score','Date','Company','Result'];

        const opts = {fields};

        //Parse the json to csv
        const parser = new Parser(opts);
        const csv = parser.parse(exportData);

        res.attachment('results.csv');
        res.status(200).send(csv);
    }catch(err){
        console.log('*** Error in Exporting the CSV of data controller ***',err);
        return res.redirect('back');
    }
}