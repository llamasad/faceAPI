const mongoose =require('mongoose');

const AutoIncrement = require('mongoose-sequence')(mongoose);
const userData=mongoose.Schema({image: Buffer}, { _id: false })

userData.plugin(AutoIncrement);

module.exports=mongoose.model('user-datas',userData)