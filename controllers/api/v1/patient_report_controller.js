const Patient= require('../../../models/user_patients');
const Doctor= require('../../../models/user_doctor');
const Report=require('../../../models/patient_report');


module.exports.createReport=async function(req,res){
    try{
        console.log(req.params.id);
        let patient= await Patient.findById(req.params.id);
        console.log(patient);
        if(patient){
            let report=await Report.create({
                status: req.body.status,
                patient: patient._id,
                doctor: req.user._id
            });
            console.log(report);
            patient.reports.push(report);
            patient.save();
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

module.exports.allReports=async function(req,res){
    try{
        let reports=await Report.find({patient:req.params.id})
        .sort('createdAt')
        .populate('doctor','name')//Both ways you can populate, path is used when nested data needs to be populated
        .populate('patient','name');

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


module.exports.showReport=async function(req,res){
    try{
        let report= await Report.find({status: req.params.status})
        .sort('createdAt')
        .populate('doctor','name')//Both ways you can populate, path is used when nested data needs to be populated
        .populate('patient','name');

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