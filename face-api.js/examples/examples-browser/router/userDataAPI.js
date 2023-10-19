const  initFaceAPI = require('../util/face-api-init');
const userDatas= require('../model/user-data')
const express = require('express');
const canvas =require('canvas');
const router = express.Router();
var faceAPI;
var faceOption;
initFaceAPI().then(({faceapi,getFaceDetectorOptions})=>{faceAPI=faceapi
    faceOption=getFaceDetectorOptions}).catch(error=>console.warn('error in API:'+error))

router.post('/userdata',async (req,res)=>{
    try{
    if(faceAPI&&faceOption){  
    console.log('wait to canvas handle base64...')
    let imgBuffer =Buffer.from(req.body.uriImg);
    const imgCanvas = await canvas.loadImage(req.body.uriImg)
    console.log('canvas done')
    const results = await faceAPI.detectAllFaces(imgCanvas, faceOption)
    .withFaceLandmarks()
    .withAgeAndGender()
    .withFaceExpressions()
    console.log(results)
    res.json(req.body)
    }
}catch(error){
    console.log(error)
}
    });
router.get('/userdata',(req,res)=>{
     userDatas.find({}).then((result)=>res.json(result));   
})
module.exports=router;
