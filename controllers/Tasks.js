const Tasks = require("../models/userTasks");
const { tacksAllowedUpdates } = require('../constants/usersAllowedUpdates')
const serverResponse = require('../utils/serverResponse')
const Providers = require('../models/serviceProviders')
const validator = require('validator');

const postNewTasks = async (req, res) => {
    try {
        const serviceProviderId = req.body.serviceProviderId
        const serviceProvider = await Providers.findOne({ _id: serviceProviderId })
        if (!serviceProvider) {
            return serverResponse(res, 401, { message: "you are not a service provider, you cant add a task!" })
        }

        const tasks = new Tasks({ ...req.body })
        await tasks.save()
        return serverResponse(res, 200, tasks)
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured" + e })
    }
}

const getAllTasks = async (req, res) => {
    try {
        const allTasks = await Tasks.find({});
        return serverResponse(res, 200, allTasks);
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured" + e })
    }
}

const deleteTasksId = async (req, res) => {
    try {
        const serviceProviderId = req.body.serviceProviderId
        const serviceProvider = await Providers.findOne({ _id: serviceProviderId })
        if (!serviceProvider) {
            return serverResponse(res, 401, { message: "you are not a service provider, you cant add a task!" })
        }

        const tasksID = req.params.tasksId;
        const tasks = await Tasks.findOneAndDelete({ _id: tasksID });
        return serverResponse(res, 200, tasks)
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured" + e });
    }
}

const putTasksId = async (req, res) => {

    const serviceProviderId = req.body.serviceProviderId
    const serviceProvider = await Providers.findOne({ _id: serviceProviderId })
    if (!serviceProvider) {
        return serverResponse(res, 401, { message: "you are not a service provider, you cant add a task!" })
    }
    const tasksId = req.params.tasksId;
    
    delete req.body.serviceProviderId
    const updates = Object.keys(req.body);
    //console.log(updates)
    const isValidOperation = updates.every((update) => tacksAllowedUpdates.includes(update));

    if (!isValidOperation) {
        return serverResponse(res, 400, { message: "Invalid updates" });
    }

    try {
        const tasks = await Tasks.findOne({ _id: tasksId })
        if (!tasks) {
            return serverResponse(res, 404, { message: "customer does not exist" });
        }
        updates.forEach((update) => (tasks[update] = req.body[update]));
        await tasks.save();
        return serverResponse(res, 200, tasks);
    } catch (err) {
        return serverResponse(res, 500, { message: "Internal error while trying to update user" });

    }
}

module.exports = {
    getAllTasks,
    postNewTasks,
    deleteTasksId,
    putTasksId

};