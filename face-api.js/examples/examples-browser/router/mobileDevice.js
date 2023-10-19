const express = require('express');
const router = express.Router();
 
router.get('/shoot',(req,res)=>{
        return res.render('mobileShoot') })


router.get('/',(req,res)=>{
        
        return res.redirect(req.baseUrl+'/shoot')
    })  
module.exports = router;
