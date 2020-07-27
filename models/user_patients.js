const mongoose=require('mongoose');
//here we create patient schema
const patientSchema=new mongoose.Schema({
    name:{
        type:String, 
        required:true
    },
    phoneno:{
        type:String,
        unique:true,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    //here we save all the reports of particular patient
    reports:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'report' 
        }
    ]
},
    {
        timestamps: true
    }
);

const patientUser=mongoose.model('patientUser',patientSchema);


module.exports=patientUser;