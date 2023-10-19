const mongoose =require('mongoose')
async function connect() {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/halloween_DB');
        console.log('ket noi thanh cong')
    }
    catch(error){
        console.log('ket noi that bai')
    }
  
  }

  module.exports={connect};