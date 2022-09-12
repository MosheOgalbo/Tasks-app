const mongoose = require('mongoose')

const serviceProviders = new mongoose.Schema({
    userName: { type: String, min: 2, max: 12, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    group: { type: String, enum: ['nutritionist', 'personalTrainer', 'MeetingCoordinator','Follow-up nurse'], required: true }
});

const Providers = mongoose.model('Providers', serviceProviders);
module.exports = Providers;