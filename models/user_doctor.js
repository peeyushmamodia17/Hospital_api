const mongoose=require('mongoose');

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