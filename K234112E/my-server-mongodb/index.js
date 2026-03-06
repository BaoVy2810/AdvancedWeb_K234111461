const express = require("express");
const path = require("path");
const app = express();
const port = 3002;

const morgan = require("morgan");
app.use(morgan("combined"));

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require("cors");
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Static files (ex63 images: put files in public/ex63/*.jpg)
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`My Server listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("This Web server is processed for MongoDB");
});

const bcrypt = require("bcrypt");
const { MongoClient, ObjectId } = require("mongodb");
client = new MongoClient("mongodb://127.0.0.1:27017");
client.connect();
database = client.db("FashionData");
fashionCollection = database.collection("Fashion");
usersCollection = database.collection("Users");

app.get("/fashions", async (req, res) => {
  const result = await fashionCollection.find({}).toArray();
  res.send(result);
});
app.get("/fashions/:id", async (req, res) => {
  var o_id = new ObjectId(req.params["id"]);
  const result = await fashionCollection.find({ _id: o_id }).toArray();
  res.send(result[0]);
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await usersCollection.insertOne({
      username,
      password: hashedPassword,
      createdAt: new Date(),
    });

    res.json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await usersCollection.findOne({ username });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      // Exercise 61: save login info in cookie (like exercise 60)
      res.cookie("loginCookie", JSON.stringify({ username, password }), {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
      });
      res.json({ success: true, message: "Login successful" });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Exercise 61: read login cookie – return username/password for input boxes
app.get("/read-login-cookie", (req, res) => {
  const loginCookie = req.cookies.loginCookie;
  if (!loginCookie) {
    return res.json({ username: "", password: "" });
  }
  try {
    const data = JSON.parse(loginCookie);
    res.json({
      username: data.username || "",
      password: data.password || "",
    });
  } catch {
    res.json({ username: "", password: "" });
  }
});

// Exercise 61: clear login cookie (e.g. on logout)
app.get("/clear-login-cookie", (req, res) => {
  res.clearCookie("loginCookie");
  res.json({ success: true });
});

// exercise 60 - Cookies
app.get("/create-cookie", (req, res) => {
  res.cookie("username", "tranngocbaovy");
  res.cookie("password", "123456");
  account = { username: "tranngocbaovy", password: "281005vV" };
  res.cookie("account", account);
  res.send("cookies are created");
});
app.get("/read-cookie", (req, res) => {
  //cookie is stored in client, so we use req
  username = req.cookies.username;
  password = req.cookies.password;
  account = req.cookies.account;
  infor = "username = " + username + "<br/>";
  infor += "password = " + password + "<br/>";
  if (account != null) {
    infor += "account.username = " + account.username + "<br/>";
    infor += "account.password = " + account.password + "<br/>";
  }
  res.send(infor);
  //Expires after 360000 ms from the time it is set.
  res.cookie("infor_limit1", "I am limited Cookie - way 1", {
    expire: 360000 + Date.now(),
  });
  res.cookie("infor_limit2", "I am limited Cookie - way 2", { maxAge: 360000 });
});
app.get("/clear-cookie", (req, res) => {
  res.clearCookie("account");
  res.send("[account] Cookie is removed");
});

// Exercise 62
var session = require("express-session");
app.use(session({ secret: "Shh, its a secret!", resave: false, saveUninitialized: false }));

app.get("/contact", (req, res) => {
  if (req.session.visited != null) {
    req.session.visited++;
    res.send("You visited this page " + req.session.visited + " times");
  } else {
    req.session.visited = 1;
    res.send("Welcome to this page for the first time!");
  }
});

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/FashionData").catch((err) => console.error("Mongoose connect error:", err));

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, default: "" },
  description: { type: String, default: "" },
  category: { type: String, default: "Rings" },
});
const Product = mongoose.model("Product", ProductSchema);

const OrderItemSchema = new mongoose.Schema({
  productId: String,
  name: String,
  price: Number,
  image: { type: String, default: "" },
  quantity: Number,
});
const OrderSchema = new mongoose.Schema({
  items: [OrderItemSchema],
  total: { type: Number, required: true },
  status: { type: String, default: "completed" },
  createdAt: { type: Date, default: Date.now },
});
const Order = mongoose.model("Order", OrderSchema);

// ─── APIs: Display products + Cart in Session ───
// GET /api/products     → list all products (for customer to choose)
// GET /api/products/:id → product detail
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().lean();
    const data = products.map((p) => ({
      ...p,
      _id: String(p._id),
    }));
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get("/api/cart/debug", (req, res) => {
  const cart = req.session.cart || [];
  res.json({ sessionId: req.sessionID, cartLength: cart.length, cart });
});
// GET  /api/cart        → read cart from session (for cart view)
// POST /api/cart/add    → add product to session cart (body: { productId } hoặc { productId, name, price, image })
// PUT  /api/cart/update → update quantity or remove (body: { productId, quantity })
// DELETE /api/cart/remove/:productId → remove item from cart
// DELETE /api/cart/clear → empty cart
app.get("/api/cart", (req, res) => {
  const cart = req.session.cart || [];
  res.json({ success: true, data: cart });
});

app.post("/api/cart/add", async (req, res) => {
  try {
    const { productId, name, price, image } = req.body;
    if (!productId)
      return res
        .status(400)
        .json({ success: false, message: "productId required" });

    if (!req.session.cart) req.session.cart = [];

    const existing = req.session.cart.find(
      (item) => item.productId === String(productId),
    );
    if (existing) {
      existing.quantity += 1;
    } else {
      if (name != null && price != null) {
        req.session.cart.push({
          productId: String(productId),
          name: String(name),
          price: Number(price),
          image: image != null ? String(image) : "",
          quantity: 1,
        });
      } else {
        const product = await Product.findById(productId).lean();
        if (!product)
          return res
            .status(404)
            .json({ success: false, message: "Product not found" });
        req.session.cart.push({
          productId: String(productId),
          name: product.name,
          price: product.price,
          image: product.image || "",
          quantity: 1,
        });
      }
    }

    res.json({
      success: true,
      message: "Added to cart",
      data: req.session.cart,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.put("/api/cart/update", (req, res) => {
  const { productId, quantity } = req.body;
  if (!req.session.cart)
    return res.status(400).json({ success: false, message: "Cart empty" });

  const item = req.session.cart.find((i) => i.productId === productId);
  if (item) {
    if (quantity <= 0) {
      req.session.cart = req.session.cart.filter(
        (i) => i.productId !== productId,
      );
    } else {
      item.quantity = quantity;
    }
  }
  res.json({ success: true, message: "Cart updated", data: req.session.cart });
});

app.delete("/api/cart/remove/:productId", (req, res) => {
  if (!req.session.cart)
    return res.status(400).json({ success: false, message: "Cart empty" });
  req.session.cart = req.session.cart.filter(
    (i) => i.productId !== req.params.productId,
  );
  res.json({ success: true, message: "Item removed", data: req.session.cart });
});

app.delete("/api/cart/clear", (req, res) => {
  req.session.cart = [];
  res.json({ success: true, message: "Cart cleared", data: [] });
});

// Only when customer confirms payment: save order to MongoDB, then clear session cart.
app.post("/api/cart/checkout", async (req, res) => {
  try {
    const cart = req.session.cart;
    if (!cart || cart.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const order = new Order({
      items: cart.map((i) => ({
        productId: i.productId,
        name: i.name,
        price: i.price,
        image: i.image || "",
        quantity: i.quantity,
      })),
      total: Math.round(total * 100) / 100,
      status: "completed",
    });
    await order.save();

    req.session.cart = [];
    res.json({
      success: true,
      message: "Order saved to database. Thank you!",
      total: total.toFixed(2),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
