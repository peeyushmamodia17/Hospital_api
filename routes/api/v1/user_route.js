const express=require('express');

const router = express.Router();
const homeController=require('../../../controllers/api/v1/user_controller');

router.post('/register',homeController.create);
router.post('/login',homeController.createSession);


module.exports=router;