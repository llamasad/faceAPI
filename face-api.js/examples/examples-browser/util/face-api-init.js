// util/face-api-init.js

const faceapi=require('face-api.js');
const canvas = require('canvas')
const { Canvas, Image, ImageData } = canvas
faceapi.env.monkeyPatch({ Canvas, Image, ImageData })
 async function initFaceAPI(){
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(process.cwd()+'/weights');
    await faceapi.nets.faceLandmark68Net.loadFromDisk(process.cwd()+'/weights');
    await faceapi.nets.ageGenderNet.loadFromDisk(process.cwd()+'/weights');
    await faceapi.nets.faceExpressionNet.loadFromDisk(process.cwd()+'/weights')
    var getFaceDetectorOptions=new faceapi.SsdMobilenetv1Options({ minConfidence:0.5 })
    console.log('init face api done')
    return {faceapi,getFaceDetectorOptions};

}
module.exports= initFaceAPI;