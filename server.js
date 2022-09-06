const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const { usersAllowedUpdates } = require('./constants/usersAllowedUpdates')
const serverResponse = require('./utils/serverResponse')


require("dotenv").config()

app.use(express.json())
// app.use(express.static("client/build"))
app.use(cors())
//MODEL


const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: Number, required: true, unique:true },
    phoneNumber: { type: String, required: true },
    password:{type:String, required:true},
    group:{ type: String, enum:['ADMIN', 'QA', 'ENGINEER', "DEVOPS", 'STUDENT'], required:true}
});


const systemUser = mongoose.model("Product", userSchema);
















//ROUTES

app.get("/api/products", async (req, res) => {
    try {
        const allProducts = await systemUser.find({})
        return serverResponse(res, 200, allProducts)
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured" + e })
    }
})

app.get("/api/product/:productId", async (req, res) => {
    try {
        const productId = req.systemUser.systemUserId 
        const product = await Product.findOne({ _id: productId }) //מבצעה חיפןש האים קיים ומכניס את הערך בסוגריים  
        return serverResponse(res, 200, product)
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured" + e })
    }
})

// fetch('/api/products/jewellery')

app.get("/api/products/:category", async (req, res) => {
    try {
        const category = req.params.category
        const product = await Product.find({ category })
        return serverResponse(res, 200, product)
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured" + e })
    }
})

app.post("/api/products", async (req, res) => {
    try {
        const product = new Product({ ...req.body })
        await product.save()
        return serverResponse(res, 200, product)
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured" + e })
    }
})

app.delete("/api/product/:productId", async (req, res) => {
    try {
        const productId = req.params.productId
        const product = await Product.findOneAndDelete({ _id: productId }) // לאחר שמצאה מבצעה מחיקה 
        return serverResponse(res, 200, product)
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured" + e })
    }
})

app.put("/api/product/:productId", async (req, res) => {
    const productId = req.params.productId
    // מקבל את המפתח של אוביקט 
    const updates = Object.keys(req.body);
    //בודק האם שדות שנתנות לעידכון 
    const isValidOperation = updates.every((update) =>
        productAllowedUpdates.includes(update));

    if (!isValidOperation) {// בודק לפי משתנה הגדרות האם הערכים נתנים לעריכה 
        return serverResponse(res, 400, { message: "Invalid updates" });
    }

    try {
        const product = await Product.findOne({ _id: productId })
        if (!product) {  //בודק האים קיים ערך כזה בשרת נתונים 
            return serverResponse(res, 404, { message: "product does not exist" });
        }
        updates.forEach((update) => (product[update] = req.body[update]));
        await product.save();
        return serverResponse(res, 200, product);
    } catch (err) {
        return serverResponse(res, 500, {
            message: "Internal error while trying to update user",
        });
    }
})



app.get("*", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html")
})


mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });


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