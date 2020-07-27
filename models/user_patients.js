const mongoose=require('mongoose');

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