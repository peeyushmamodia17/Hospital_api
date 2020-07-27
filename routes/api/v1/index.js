const express=require('express');

const router = express.Router();
const passport=require('passport');
const reportController= require('../../../controllers/api/v1/patient_report_controller');

//here we transfer route to user_route when /doctors occoue
router.use('/doctors',require('./user_route'));
//here we transfer route to patient_route when /patient occoue
router.use('/patient',require('./patient_route'));
//here route for find all the report using status and authenticate using jwt
router.get('/reports/:status',passport.authenticate('jwt', {session: false}),reportController.showReport);

module.exports=router;