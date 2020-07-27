const mongoose=require('mongoose');
//here we create doctor schema
const doctorSchema=new mongoose.Schema({
    name:{
        type:String, 
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    //we also save the patient of that doctor
    patients:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'patientUser'
        }
    ]
},
    {
        timestamps: true
    }
);



const user=mongoose.model('user',doctorSchema);


module.exports=user;