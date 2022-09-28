const mongoose = require('mongoose');
const cors = require('cors');

const express = require('express');
const { getAllCustomers,
    getCustomerId,
    postCustomer,
    deleteCustomerId,
    verifyLoginCustomers,
    putCustomerId,
     } = require('./controllers/customers');
const { postProvider,
    getAllProvider,
    verifyLoginProviders,
    getProviderId,
    deleteProviderId,
    putProviderId,
     } = require('./controllers/providers');
const { getAllTasks, postNewTasks, deleteTasksId, putTasksId } = require('./controllers/Tasks');
const someVerifyTokenFunction = require('./middlewares/verifyToken');
require("dotenv").config();
const app = express()




app.use(express.json())
app.use(express.static("tasks-app-project/build"))
app.use(cors())


//ROUTES

//customers
app.post("/api/customers", postCustomer); // not needed to verify user
app.post("/api/loginCustomers", verifyLoginCustomers); // not needed to verify user
app.get("/api/customers",someVerifyTokenFunction, getAllCustomers);
app.get("/api/customer/:customerId", someVerifyTokenFunction, getCustomerId);
app.delete("/api/customer/:customerId",someVerifyTokenFunction, deleteCustomerId);
app.put("/api/customer/:customerId", someVerifyTokenFunction, putCustomerId);
//providers
app.post("/api/providers", postProvider);
app.get("/api/providers", getAllProvider);
app.post("/api/loginProviders", verifyLoginProviders);
app.get("/api/provider/:providerId", someVerifyTokenFunction, getProviderId);
app.delete("/api/provider/:providerId", someVerifyTokenFunction, deleteProviderId);
app.put("/api/provider/:providerId", someVerifyTokenFunction, putProviderId);
//Tasks
app.get("/api/Tasks", getAllTasks);
app.post("/api/Tasks", someVerifyTokenFunction, postNewTasks);
app.delete("/api/Tasks/:tasksId",someVerifyTokenFunction, deleteTasksId)
app.put("/api/Tasks/:tasksId",someVerifyTokenFunction, putTasksId)


//
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/tasks-app-project/build/index.html")
})



mongoose.connect('mongodb://localhost:27017/test1', { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(process.env.PORT || 8000, () => {
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