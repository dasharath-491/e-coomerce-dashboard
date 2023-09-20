const express = require("express")
require("./db/config")
const User = require("./db/User")
const cors = require("cors")
const Product = require("./db/Product")
const jwt = require("jsonwebtoken")
const JwtKey = "e-comm"

const app = express();
app.use(express.json())
app.use(cors())

app.post("/register", async (req, resp) => {
    let user = new User(req.body)
    let result = await user.save()
    result = result.toObject();
    delete result.password
    if (result) {
        const auth = await jwt.sign(
            { user },
            JwtKey,
            {
                expiresIn: "10h",
            }
        )
        resp.send({ result, auth })
    } else {
        resp.send({ result: "NO Record Found" })
    }
})

app.post("/login", async (req, resp) => {
    console.log(req.body)
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password")
        if (user) {
            const auth = await jwt.sign(
                { user },
                JwtKey,
                {
                    expiresIn: "10h",
                }
            )
            resp.send({ user, auth })

        } else {
            resp.send({ result: "NO Record Found" })
        }
    } else {
        resp.send({ result: "NO Record Found" })
    }

})

app.post("/add-product", async (req, resp) => {
    let product = new Product(req.body)
    let result = await product.save()
    resp.send(result)
})

app.get("/products", async (req, resp) => {
    let products = await Product.find()
    if (products.length > 0) {
        resp.send(products)
    } else {
        resp.send({ result: "No Products Found" })
    }

})

app.delete("/product/:id", async (req, resp) => {
    const id = req.params.id
    const result = await Product.deleteOne({ _id: id })
    resp.send(result)

})

app.get("/product/:id", async (req, resp) => {
    try {
        const id = req.params.id
        let result = await Product.findOne({ _id: id })
        if (result) {
            resp.send(result)
        } else {
            resp.send({ result: "No Data" })
        }
    } catch (error) {
        resp.send(error.message)
    }
})

app.put("/product/:id", async (req, resp) => {
    try {
        const id = req.params.id
        let result = await Product.updateOne(
            { _id: id },
            {
                $set: req.body
            }
        )
        resp.send(result)
    } catch (error) {
        resp.send(error.message)
    }
})

app.get("/search/:key", async (req, resp) => {
    let result = await Product.find(
        {
            "$or": [
                { name: { $regex: req.params.key } },
                { company: { $regex: req.params.key } },
                { category: { $regex: req.params.key } }
            ]
        })
    resp.send(result)
})











app.listen(5001)



// const connectDB = async () => {
//     mongoose.connect("mongodb://localhost:27017/e-comm")
//     const BookSchema = new mongoose.Schema({});
//     const Book = mongoose.model("books", BookSchema)
//     const data = await Book.find()
//     console.warn(data)
// }

// connectDB()
// app.get("/", (req, resp) => {
//     resp.send("app is working...")
// })

