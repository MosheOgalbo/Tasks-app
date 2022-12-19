
const mongoose = require('mongoose')


/* MODEL customers   */
const customersSchema = new mongoose.Schema({
    userName: { type: String, min: 2, max: 12, required: true },
    fullName: { type: String, min: 2, max: 12, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, min: 10, max: 15, required: true, unique: true },
    password: { type: String, required: true },
    typeTreatment: { type: String, enum: ['BASIC', 'PLUS', 'PRO'], required: true },
    activePhysical: { type: Boolean, default: false },
    bodyData: {
        age: { type: String, required: true },
        height: { type: String, required: true },
        weight: { type: String, required: true },
        scope: { type: String, required: true }
    },
    salt: { type: String },
    calculatedTask:[{type: mongoose.Types.ObjectId, ref:'task'}]
});
const Customers = mongoose.model("Customers", customersSchema);

module.exports = Customers;

