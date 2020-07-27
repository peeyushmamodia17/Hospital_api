process.env.NODE_ENV = 'test';
//import all the models 
const mongoose=require('mongoose');
const Patient=require('../models/user_patients');
const Doctor= require('../models/user_doctor');
const Report= require('../models/patient_report');
//import chai and chai-http
const chai = require('chai');
const chaiHttp = require('chai-http');
//import the server file index.js
const server = require('../index');
const should = chai.should();
chai.use(chaiHttp);

//test for patient register
describe('/POST patientregister',()=>{
    it('It should patienty register',(done)=>{
        //data for register patient
        let patient={
            name: "girish",
            phoneno: "84354681455",
            city: "Jaipur",
        }

        chai.request(server)
        //url
        .post('/api/v1/patient/register')
        //set the bearer token
        .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXRpZW50cyI6WyI1ZjFlZDZkMTc0ZWQ2NTg3NTRmYjIwODkiLCI1ZjFlZDdiMzk1NDAzZjZhYjBlMmE2YWEiLCI1ZjFlZDg2M2ZiYTkwZTYyYjhhNjA0ZWIiXSwiX2lkIjoiNWYxZWQ1ODk4MTUwYjY4MmI4NzA2YmY2IiwibmFtZSI6ImFtYW4iLCJlbWFpbCI6ImFtYW5AZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTIkeUN1cFQzSXpYUjB5UzZJLk5odGU0LmguTjk4eE9nUUE2YTRMbkFGU2dVbHNIVzlweWtoZE8iLCJjcmVhdGVkQXQiOiIyMDIwLTA3LTI3VDEzOjI0OjI1LjI2N1oiLCJ1cGRhdGVkQXQiOiIyMDIwLTA3LTI3VDEzOjM2OjM1LjIwN1oiLCJfX3YiOjMsImlhdCI6MTU5NTg2MTk4MiwiZXhwIjoxNTk4NDUzOTgyfQ.f2RxMY2kTl1oBDz4Xfh9ijV-qcrE0YHORH2ERKYP9KE')
        //send data
        .send(patient)
        .end((err,res)=>{

        //check all the test cases
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Patient created successfuly');
            res.body.data.patient.should.have.property('name');
            res.body.data.patient.should.have.property('phoneno');
            res.body.data.patient.should.have.property('city');
            res.body.data.patient.should.have.property('doctor');

            done();
            console.log(err);
        })     
    })
})

//test for create report
describe('/POST createReport',()=>{
    it('It should create report',(done)=>{
        //data for report 
        let report={
            status:"quarantine",
        }

        chai.request(server)
        //url
        .post('/api/v1/patient/5f1ed6d174ed658754fb2089/create_report')
        //set the bearer token
        .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXRpZW50cyI6WyI1ZjFlZDZkMTc0ZWQ2NTg3NTRmYjIwODkiLCI1ZjFlZDdiMzk1NDAzZjZhYjBlMmE2YWEiLCI1ZjFlZDg2M2ZiYTkwZTYyYjhhNjA0ZWIiXSwiX2lkIjoiNWYxZWQ1ODk4MTUwYjY4MmI4NzA2YmY2IiwibmFtZSI6ImFtYW4iLCJlbWFpbCI6ImFtYW5AZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTIkeUN1cFQzSXpYUjB5UzZJLk5odGU0LmguTjk4eE9nUUE2YTRMbkFGU2dVbHNIVzlweWtoZE8iLCJjcmVhdGVkQXQiOiIyMDIwLTA3LTI3VDEzOjI0OjI1LjI2N1oiLCJ1cGRhdGVkQXQiOiIyMDIwLTA3LTI3VDEzOjM2OjM1LjIwN1oiLCJfX3YiOjMsImlhdCI6MTU5NTg2MTk4MiwiZXhwIjoxNTk4NDUzOTgyfQ.f2RxMY2kTl1oBDz4Xfh9ijV-qcrE0YHORH2ERKYP9KE')
        //send the report data
        .send(report)
        .end((err,res)=>{
            //check all the test cases
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Report created');
            res.body.data.report.should.have.property('status');
            res.body.data.report.should.have.property('patient');
            res.body.data.report.should.have.property('doctor');

            done();
            console.log(err);
        })


    })
})

//test for show reports of particular patient
describe('/GET showreports',()=>{
    it('Show all reports of particular patient',(done)=>{
        chai.request(server)
        //url
        .get('/api/v1/patient/5f1ed6d174ed658754fb2089/all_reports')
        //set the bearer token
        .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXRpZW50cyI6WyI1ZjFlZDZkMTc0ZWQ2NTg3NTRmYjIwODkiLCI1ZjFlZDdiMzk1NDAzZjZhYjBlMmE2YWEiLCI1ZjFlZDg2M2ZiYTkwZTYyYjhhNjA0ZWIiXSwiX2lkIjoiNWYxZWQ1ODk4MTUwYjY4MmI4NzA2YmY2IiwibmFtZSI6ImFtYW4iLCJlbWFpbCI6ImFtYW5AZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTIkeUN1cFQzSXpYUjB5UzZJLk5odGU0LmguTjk4eE9nUUE2YTRMbkFGU2dVbHNIVzlweWtoZE8iLCJjcmVhdGVkQXQiOiIyMDIwLTA3LTI3VDEzOjI0OjI1LjI2N1oiLCJ1cGRhdGVkQXQiOiIyMDIwLTA3LTI3VDEzOjM2OjM1LjIwN1oiLCJfX3YiOjMsImlhdCI6MTU5NTg2MTk4MiwiZXhwIjoxNTk4NDUzOTgyfQ.f2RxMY2kTl1oBDz4Xfh9ijV-qcrE0YHORH2ERKYP9KE')
        .end((err,res)=>{
                //check for all the test cases
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('List of reports');
                res.body.data.should.have.property('Reports');

                done();
                console.log(err);
        })
    })
    
})

//test for get all report by status
describe('/GET allReportsbystatus',()=>{
    it('All reports filter by status',(done)=>{
        chai.request(server)
        //url
        .get('/api/v1/reports/quarantine')
        //set the bearer token
        .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXRpZW50cyI6WyI1ZjFlZDZkMTc0ZWQ2NTg3NTRmYjIwODkiLCI1ZjFlZDdiMzk1NDAzZjZhYjBlMmE2YWEiLCI1ZjFlZDg2M2ZiYTkwZTYyYjhhNjA0ZWIiXSwiX2lkIjoiNWYxZWQ1ODk4MTUwYjY4MmI4NzA2YmY2IiwibmFtZSI6ImFtYW4iLCJlbWFpbCI6ImFtYW5AZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTIkeUN1cFQzSXpYUjB5UzZJLk5odGU0LmguTjk4eE9nUUE2YTRMbkFGU2dVbHNIVzlweWtoZE8iLCJjcmVhdGVkQXQiOiIyMDIwLTA3LTI3VDEzOjI0OjI1LjI2N1oiLCJ1cGRhdGVkQXQiOiIyMDIwLTA3LTI3VDEzOjM2OjM1LjIwN1oiLCJfX3YiOjMsImlhdCI6MTU5NTg2MTk4MiwiZXhwIjoxNTk4NDUzOTgyfQ.f2RxMY2kTl1oBDz4Xfh9ijV-qcrE0YHORH2ERKYP9KE')
        .end((err,res)=>{
                //check for all the test cases
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('List of quarantine reports');
                res.body.data.should.have.property('report');

                done();
                console.log(err);
        })
    })
})