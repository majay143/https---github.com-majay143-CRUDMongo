const mongoose = require('mongoose');
// Connecting mongo db database to vs code
mongoose.connect('mongodb://0.0.0.0:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('DB is connected ');// Start your application or perform database operations
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);})
    ///import mongoose from 'mongoose';
////const { Schema } = mongoose;

const userSchema=new mongoose.Schema({
    name:String,
    age:Number,
    isMarried:Boolean,
    email:String,
    salary:Number,
    gender:String,
    salary:Number,
    originalPrice:String
    
})// creaating a model based on above schema
const User=mongoose.model('User',userSchema);
async function fetchInformation(){// get user data only with the given values 
const users = await User.find({isMarried:false}).select('name age gender').sort('salary').limit(1);
const hari=await User.find({age : {$lte:23}});
////comaparasion ooperators gt , gte ,lt,lte ,
let x=await User.countDocuments();
console.log("total number documents in the data base = ",x)
// sort('salary') gives data in asc order and -salary gives data in desc order

const us= await User.findOne({age:23,name:'Akhila'}).select('-name -salary');
console.log(us);
console.log(hari)
// findOne returns the object data find returnds the array data and if first matched data only wii be return
console.log(users);
}
async function db(){// deleting data in mongo db data base with partciular ID value 
  await User.deleteOne({_id:'648c88bbf0bcf6a8aec0c708'})
//// deleteOne deleteMany  and findByIdAndDelete are delete methods in Mongo DB to delete collections
  await User.findByIdAndDelete('648c7393128c68924da29c30')// the collections with the given field date will be deleted
const user = await User.findByIdAndUpdate('648d1784be30cc90f347ef2d',{age:21, isMarried:true},
  {new : true, runValidators:true});// validators check wheather the given id is true or false
  /// return true if it exists in user schema like the values which you update 
///await key word is used as aynch func is declared it pause the excution for a period of time 
  user.isMarried=true;// update data and save this data
  user.salary=30000;
  await user.save();
}//console.log(db());
db();
fetchInformation();
async function storeInformation() {
const user = new User({
    name:'Akhila',
    age:23,
    isMarried:false,
    email:'lyhxr@example.com',
    gender:'male',
    salary:56780,
});
const us=new User({// adding a new collection in mongo DB
    name:'Ajay',
    age:25,
    isMarried:false,
    email:'ajay@example.com',
    salary:10000,
});
await(us.save());
await(user.save());
console.log(user);
console.log(us);
}
console.log(user); // saving tha above data in the data base 
console.log(storeInformation());