const express=require('express');

const router = express.Router();
const passport=require('passport');
const homeController=require('../../../controllers/api/v1/user_controller');
const reportController= require('../../../controllers/api/v1/patient_report_controller');

router.use('/doctors',require('./user_route'));
router.use('/patient',require('./patient_route'));
router.get('/reports/:status',passport.authenticate('jwt', {session: false}),reportController.showReport);

module.exports=router;