process.env.NODE_ENV = 'test';
//import all the models
const mongoose=require('mongoose');
const Patient=require('../models/user_patients');
const Doctor= require('../models/user_doctor');
const Report= require('../models/patient_report');

//import chai and chai-http
const chai = require('chai');
const chaiHttp = require('chai-http');
//import server file index.js
const server = require('../index');
const should = chai.should();
chai.use(chaiHttp);
//test for register doctor
describe('/POST doctors',()=>{
    it('It should register the doctor',(done)=>{
        //data for register doctor
        let doctor={
            name:"amah",
            email: "amah@gmail.com",
            password: "123456",
            rpassword: "123456"
        }

        //request to server for connect
        chai.request(server)
        //url
        .post('/api/v1/doctors/register')
        //send data
        .send(doctor)
        .end((err,res)=>{
            //compare all the test cases
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('User created Successfully');
            res.body.data.user.should.have.property('name');
            res.body.data.user.should.have.property('email');
            res.body.data.user.should.have.property('password');

            done();
            console.log(err);
        });
    });
});

//test for doctor login
describe('POST login',()=>{
    it('Doctor should log in',(done)=>{
        //pass the data
        let doctor={
            email:"aman@gmail.com",
            password:"123456"
        }

        chai.request(server)
        //url
        .post('/api/v1/doctors/login')
        //send data
        .send(doctor)
        .end((err,res)=>{
            //compare all the test cases
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Sign in successful, here is your token, please keep it safe!');
            res.body.data.should.have.property('token');

            done();
            console.log(err);
        })
    })
})

