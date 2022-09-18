const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express')
const { getAllCustomers, getCustomerId, postCustomer, deleteCustomerId, verifyLoginCustomers, putCustomerId } = require('./controllers/customers')
const { postProvider, getAllProvider, verifyLoginProviders, getProviderId, deleteProviderId, putProviderId } = require('./controllers/providers')
const { getAllTasks, postNewTasks, deleteTasksId, putTasksId } = require('./controllers/Tasks')
const app = express()


require("dotenv").config()

app.use(express.json())
app.use(express.static("client/build"))
app.use(cors())


//ROUTES

//customers
app.post("/api/customers", postCustomer);
app.post("/api/loginCustomers", verifyLoginCustomers);
app.get("/api/customers", getAllCustomers);
app.get("/api/customer/:customerId", getCustomerId);
app.delete("/api/customer/:customerId", deleteCustomerId);
app.put("/api/customer/:customerId", putCustomerId);
//providers
app.post("/api/providers", postProvider);
app.get("/api/providers", getAllProvider);
app.post("/api/loginProviders", verifyLoginProviders);
app.get("/api/provider/:providerId",getProviderId);
app.delete("/api/provider/:providerId",deleteProviderId);
app.put("/api/provider/:providerId",putProviderId);
//Tasks
app.get("/api/Tasks",getAllTasks);
app.post("/api/Tasks",postNewTasks);
app.delete("/api/Tasks/:tasksId",deleteTasksId)
app.put("/api/Tasks/:tasksId",putTasksId)






app.get("*", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html")
})



mongoose.connect('mongodb://localhost:27017/test1', { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(8000, () => {
    console.log('Server running at http://127.0.0.1:8000/');
})



// const { DB_USER, DB_PASS, DB_HOST, DB_NAME, PORT} = process.env;

// mongoose.connect(
//   `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   (err) => {
//     app.listen(PORT || 8000, () => {
//       console.log("err", err);
//       console.log("Ani maazin!");
//     });
//   }
// );