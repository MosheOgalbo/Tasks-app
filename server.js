const mongoose = require('mongoose')
const cors = require('cors')
const { getAllCustomers, getCustomerId, postCustomer, deleteCustomerId, verifyLogin, putCustomerId } = require('./controllers/customers')
const express = require('express')
const { postProvider, getAllProvider } = require('./controllers/providers')
const app = express()


require("dotenv").config()

app.use(express.json())
app.use(express.static("client/build"))
app.use(cors())


//ROUTES
//customers
app.post("/api/customers", postCustomer)
app.post("/api/login", verifyLogin)
app.get("/api/customers", getAllCustomers);
app.get("/api/customer/:customerId", getCustomerId);
app.delete("/api/customer/:customerId", deleteCustomerId);
app.put("/api/customer/:customerId", putCustomerId);
//providers
app.post("/api/providers",postProvider)
app.get("/api/providers",getAllProvider);


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