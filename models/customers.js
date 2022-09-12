
const mongoose = require('mongoose')



/* MODEL customers   */
const customersSchema = new mongoose.Schema({
    userName: { type: String, min: 2, max: 12, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true  },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true }, 
    typeTreatment: { type: String, default: null },
    activePhysical: { type: Boolean, default: false }
});
const Customers = mongoose.model("Customers", customersSchema);

module.exports = Customers;

