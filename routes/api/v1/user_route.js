const express=require('express');

const router = express.Router();
const homeController=require('../../../controllers/api/v1/user_controller');

//here route register teh doctor 
router.post('/register',homeController.create);
//here route for doctor login
router.post('/login',homeController.createSession);


module.exports=router;