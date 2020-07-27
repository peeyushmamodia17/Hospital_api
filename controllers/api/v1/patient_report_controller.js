//here import all the three models 
const Patient= require('../../../models/user_patients');
const Doctor= require('../../../models/user_doctor');
const Report=require('../../../models/patient_report');

//module for creating the patient report
module.exports.createReport=async function(req,res){
    try{
        console.log(req.params.id);
        //here we find the patient using id
        let patient= await Patient.findById(req.params.id);
        console.log(patient);
        if(patient){
            //here we create the report
            let report=await Report.create({
                status: req.body.status,
                patient: patient._id,
                doctor: req.user._id
            });
            console.log(report);
            //here we push the report into patient data
            patient.reports.push(report);
            patient.save();
            //return the report data in json
            return res.json(200,{
                message: "Report created",
                data:{
                    report: report
                }
                
            })
        }
        return res.json(404,{
            message: "Patient could not be found"
        });
    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
    
}

//module for show all the reports of particular patient
module.exports.allReports=async function(req,res){
    try{
        //here we find the report
        let reports=await Report.find({patient:req.params.id})
        .sort('createdAt')
        .populate('doctor','name')//Both ways you can populate, path is used when nested data needs to be populated
        .populate('patient','name');

        //here we return the data
        return res.json(200,{
            message: "List of reports",
            data:{
                Reports: reports
            }
            
        })
    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}

//module for show report of particular status
module.exports.showReport=async function(req,res){
    try{
        //here we find the report using status
        let report= await Report.find({status: req.params.status})
        .sort('createdAt')
        .populate('doctor','name')//Both ways you can populate, path is used when nested data needs to be populated
        .populate('patient','name');

        //here we return the data in json
        return res.json(200,{
            message: `List of ${req.params.status} reports`,
            data:{
                report: report
            }
        })
    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}