const express=require('express');

const router = express.Router();
const passport=require('passport');
const homeController=require('../../../controllers/api/v1/user_controller');
const reportController= require('../../../controllers/api/v1/patient_report_controller')

//here route for register the patient and authenticate using jwt
router.post('/register',passport.authenticate('jwt', {session: false}),homeController.createPatients);
//here route for find all the patient and authenticate using jwt
router.get('/allPatients',passport.authenticate('jwt', {session: false}),homeController.allPatient);
//here route for create report and authenticate using jwt
router.post('/:id/create_report',passport.authenticate('jwt', {session: false}),reportController.createReport);
//here route for find all the report using patient id and authenticate using jwt
router.get('/:id/all_reports',passport.authenticate('jwt', {session: false}),reportController.allReports);

module.exports=router;