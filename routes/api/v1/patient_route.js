const express=require('express');

const router = express.Router();
const passport=require('passport');
const homeController=require('../../../controllers/api/v1/user_controller');
const reportController= require('../../../controllers/api/v1/patient_report_controller')

router.post('/register',passport.authenticate('jwt', {session: false}),homeController.createPatients);
router.get('/allPatients',passport.authenticate('jwt', {session: false}),homeController.allPatient);
router.post('/:id/create_report',passport.authenticate('jwt', {session: false}),reportController.createReport);
router.get('/:id/all_reports',passport.authenticate('jwt', {session: false}),reportController.allReports);

module.exports=router;