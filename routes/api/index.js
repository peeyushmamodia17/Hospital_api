const express=require('express');

const router = express.Router();
//here we transfer route to v1 when /v1 occoue
router.use('/v1',require('./v1'));

module.exports=router;