const mongoose=require('mongoose');

//here we create report schema
const reportSchema=new mongoose.Schema({
    status:{
        type:String,
        required:true
    },
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'patientUser'
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
},
    {
        timestamps: true
    }
);

const report=mongoose.model('report',reportSchema);

//export report schema

module.exports=report;