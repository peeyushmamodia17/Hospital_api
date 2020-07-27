const bcrypt=require('bcrypt');
const User=require('../../../models/user_doctor');
const patientUser=require('../../../models/user_patients');
const jwt = require('jsonwebtoken');

var BCRYPT_SALT_ROUNDS = 12;
module.exports.create=async function(req,res){
    try{
        console.log(req.body);
        if(req.body.password!=req.body.rpassword){
            return res.json(401,{
                message: "Password and repeat password does not match"
            });
        }
        console.log(req.body);
        let user=await User.findOne({email:req.body.email});
        if(!user){
            //bcrypt for decrypt password
            let hashPassword=await bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS);
            console.log(hashPassword);
            let user = await User.create({
                name:req.body.name,
                email:req.body.email,
                password:hashPassword
            });
            return res.json(200,{
                message: "User created Successfully",
                data:{
                    user: user
                }
                
            });
        }else{
           return res.json(401,{
               message: "error in creating profile"
           })
        }
    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }  
}


module.exports.createSession = async function(req, res){

    try{
        console.log(req.body);
        let user = await User.findOne({email: req.body.email});
        console.log(user);
        let checkpassword=await bcrypt.compare(req.body.password,user.password);
        console.log(checkpassword);
        if (!user || !checkpassword){
            return res.json(422, {
                message: "Invalid username or password"
            });
        }

        return res.json(200, {
            message: 'Sign in successful, here is your token, please keep it safe!',
            data:  {
                token: jwt.sign(user.toJSON(), 'codeial', {expiresIn:  '1d'})
            }
        })

    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}


module.exports.createPatients=async function(req,res){
    console.log(req.body);
    try{
        console.log(req.user);
        console.log(req.body);
        console.log(req.user.id)
        let user=await User.findById(req.user.id);
        let user1=await patientUser.findOne({phoneno:req.body.phoneno});
        if(user && !user1){
            
            let patient= await patientUser.create({
                name:req.body.name,
                phoneno:req.body.phoneno,
                city:req.body.city,
                doctor:req.user.id
            });
            user.patients.push(patient);
            user.save();
            return res.json(200,{
                message : "Patient created successfuly",
                data:{
                    patient: patient
                }
                
            })
        }else if(user1){
            return res.json(401,{
                message: "patient already avialable",
                data:{
                    patient : user1
                }
                
            })
        }else{
            return res.json(401,{
                message: "You are not looged in"
            })
        }
    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
    
}

module.exports.allPatient=async function(req,res){
    try{
        let patients=await patientUser.find()
        .populate("reports",'status');

        return res.json(200,{
            message: "All Patients",
            data:{
                patients: patients
            }
        })

    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}