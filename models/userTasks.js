const mongoose = require('mongoose');

/* MODEL Tasks   */
const tasksToUsers = new mongoose.Schema({
    title: {type: String, min: 2, max: 12, required: true},
    amountOfRounds:{type:Number, required: true},
    activity:{type:String, enum:['running', 'rowing', 'stairs', 'dumbbells', 'straps', 'pilatesMat', 'bicycleRiding'], required: true},
    timeActivity: {type:Number, required:true},  
    intensityLevel:{type:String, enum:['easy', 'medium', 'hard'], default:'easy'},
    owner:{type: mongoose.Types.ObjectId, ref:'Providers'}
});

const Tasks = mongoose.mongoose.model("Tasks", tasksToUsers);
module.exports = Tasks;