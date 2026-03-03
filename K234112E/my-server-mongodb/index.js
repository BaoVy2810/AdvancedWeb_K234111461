const express = require("express");
const app = express();
const port = 3002;

const morgan = require("morgan");
app.use(morgan("combined"));

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());

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

app.get("/fashions", cors(), async (req, res) => {
  const result = await fashionCollection.find({}).toArray();
  res.send(result);
});
app.get("/fashions/:id", cors(), async (req, res) => {
  var o_id = new ObjectId(req.params["id"]);
  const result = await fashionCollection.find({ _id: o_id }).toArray();
  res.send(result[0]);
});

app.post("/register", cors(), async (req, res) => {
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

app.post("/login", cors(), async (req, res) => {
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
      res.json({ success: true, message: "Login successful" });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

//exercise 60 - Cookies
var cookieParser = require("cookie-parser");
app.use(cookieParser());

app.get("/create-cookie", cors(), (req, res) => {
  res.cookie("username", "tranngocbaovy");
  res.cookie("password", "123456");
  account = { username: "tranngocbaovy", password: "281005vV" };
  res.cookie("account", account);
  res.send("cookies are created");
});
app.get("/read-cookie", cors(), (req, res) => {
  //cookie is stored in client, so we use req
  username = req.cookies.username;
  password = req.cookies.password;
  account = req.cookies.account;
  infor = "username = " + username + "<br/>";
  infor += "password = " + password + "<br/>";
  if(account!=null)
  {
    infor+="account.username = "+account.username+"<br/>"
    infor+="account.password = "+account.password+"<br/>"
  }
  res.send(infor);
  //Expires after 360000 ms from the time it is set.
  res.cookie("infor_limit1", "I am limited Cookie - way 1", { expire: 360000 + Date.now()});
  res.cookie("infor_limit2", "I am limited Cookie - way 2", { maxAge: 360000 });
});
app.get("/clear-cookie",cors(),(req,res)=>{
  res.clearCookie("account")
  res.send("[account] Cookie is removed")
})