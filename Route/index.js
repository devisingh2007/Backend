const express = require("express")
const mongoose = require("mongoose")

const app = express()
app.use(express.json())

const PORT = 5000

mongoose.connect("mongodb://127.0.0.1:27017/backendClassDB")
  .then(() => {
    console.log("MongoDB Connected Successfully")
  })
  .catch((err) => {
    console.log("Database connection error", err)
  })

  const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  Price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  }
})

const Product = mongoose.model("Product", ProductSchema)

app.post("/product", async (req, res) => {
  const { title, Price, category, brand } = req.body

  const ProductData = { title, Price, category, brand }

  try {
    const NewProduct = new Product(ProductData)
    await NewProduct.save()
    res.status(200).json(NewProduct)
  } catch (error) {
    res.status(404).send(error)
  }
})


app.post("/products/bulk", async (req, res) => {
  const products = req.body

  try {
    const newProducts = await Product.insertMany(products)
    res.status(201).json({
      message: "Multiple products added successfully",
      data: newProducts
    })
  } catch (error) {
    res.status(500).send(error)
  }
})

app.get("/get-products", async (req, res) => {
  try {
    const product = await Product.find()
    if (!product) {
      return res.status(404).send("Product Not Found")
    }
    res.json(product)
  } catch (error) {
    res.status(404).send(error)
  }
})

app.get("/product/:id", async (req, res) => {
  try {
    const ProductId = req.params.id
    const product = await Product.findById(ProductId)

    if (!product) {
      return res.status(404).send("Product Not Found")
    }

    res.json(product)
  } catch (error) {
    res.status(404).send(error)
  }
})

app.get("/products/:category/:brand", async (req, res) => {
  try {
    const { category, brand } = req.params

    const products = await Product.find({ category: category, brand: brand })

    if (!products) {
      return res.status(404).send("Products Not Found")
    }

    res.json(products)
  } catch (error) {
    res.status(404).send(error)
  }
})

app.listen(PORT, () => {
  console.log("Server running on port", PORT)
})

